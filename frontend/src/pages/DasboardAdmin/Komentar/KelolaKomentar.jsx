import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Notification from "../../../components/Notification/Notification";
import styles from "./KelolaKomentar.module.css";

function KelolaKomentar() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFilm, setFilterFilm] = useState("");
  const [films, setFilms] = useState([]);
  const filterFilmRef = React.useRef(null);
  const [isFilterFilmOpen, setIsFilterFilmOpen] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "info",
    message: "",
  });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null });

  const API_URL = "http://localhost:3000/api";

  // Helper function untuk show notification
  const showNotification = (type, message, duration = 3000) => {
    setNotification({
      show: true,
      type,
      message,
    });
    if (duration > 0) {
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, duration);
    }
  };

  // Fetch semua komentar
  const fetchComments = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("authToken");

      if (!token) {
        const errorMsg = "Anda harus login terlebih dahulu";
        setError(errorMsg);
        showNotification("error", errorMsg);
        return;
      }

      const response = await fetch(`${API_URL}/comments-all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data komentar");
      }

      const result = await response.json();
      setComments(result.data || []);

      // Extract unique films
      const uniqueFilms = [
        ...new Map(
          result.data?.map((comment) => [
            comment.id_film,
            { id: comment.id_film, judul: comment.judul_film },
          ]),
        ).values(),
      ];
      setFilms(uniqueFilms);
    } catch (err) {
      console.error("Error fetching comments:", err);
      const errorMsg = err.message || "Gagal mengambil data komentar";
      setError(errorMsg);
      showNotification("error", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterFilmRef.current && !filterFilmRef.current.contains(e.target)) {
        setIsFilterFilmOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Delete
  const handleDelete = async (id_comment) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_URL}/comments/${id_comment}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus komentar");
      }

      setConfirmModal({ isOpen: false, id: null });
      showNotification("success", "Komentar berhasil dihapus");
      fetchComments();
    } catch (err) {
      console.error("Error deleting comment:", err);
      showNotification("error", err.message || "Gagal menghapus komentar");
    }
  };

  // Filter comments based on search and film filter
  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.komentar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.username.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      !filterFilm || comment.id_film === parseInt(filterFilm);

    return matchesSearch && matchesFilter;
  });

  // Format tanggal
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={styles.pageContainer}>
      <Notification
        type={notification.type}
        message={notification.message}
        show={notification.show}
        onClose={() => setNotification((prev) => ({ ...prev, show: false }))}
      />
      <Sidebar />

      {/* Confirm Modal */}
      {confirmModal.isOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setConfirmModal({ isOpen: false, id: null })}
        >
          <div
            className={styles.confirmModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.confirmHeader}>
              <h3>⚠️ Hapus Komentar</h3>
            </div>
            <p className={styles.confirmMessage}>
              Apakah Anda yakin ingin menghapus komentar ini? Tindakan ini tidak
              dapat dibatalkan.
            </p>
            <div className={styles.confirmFooter}>
              <button
                onClick={() => setConfirmModal({ isOpen: false, id: null })}
                className={styles.cancelBtn}
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(confirmModal.id)}
                className={styles.confirmDeleteBtn}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <main className={styles.mainContent}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <div>
            <h1 className={styles.pageTitle}>Kelola Komentar</h1>
            <p className={styles.pageSubtitle}>
              Kelola semua komentar dari pengguna di PopTube
            </p>
          </div>
          <button
            onClick={fetchComments}
            className={styles.refreshButton}
            disabled={loading}
          >
            {loading ? "Memuat..." : "🔄 Refresh"}
          </button>
        </div>

        {/* Stats Grid */}
        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span>Total Komentar</span>
            <h3>{comments.length}</h3>
          </div>

          <div className={styles.statCard}>
            <span>Pengguna Berkomentar</span>
            <h3>{new Set(comments.map((c) => c.id_user)).size}</h3>
          </div>

          <div className={styles.statCard}>
            <span>Film Dikomentari</span>
            <h3>{films.length}</h3>
          </div>
        </section>

        {/* Filters */}
        <div className={styles.filterSection}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Cari komentar atau nama pengguna..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>

          <div className={styles.customFilterDropdown} ref={filterFilmRef}>
            <button
              type="button"
              className={`${styles.dropdownTrigger} ${isFilterFilmOpen ? styles.dropdownTriggerOpen : ""}`}
              onClick={() => setIsFilterFilmOpen(!isFilterFilmOpen)}
            >
              <span className={styles.dropdownSelected}>
                <span className={styles.truncateText}>
                  {filterFilm === "" ? "Semua Film" : films.find(f => f.id.toString() === filterFilm)?.judul || "Semua Film"}
                </span>
              </span>
              <svg
                className={`${styles.chevron} ${isFilterFilmOpen ? styles.chevronOpen : ""}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {isFilterFilmOpen && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownMenuScrollable}>
                  <button
                    type="button"
                    className={`${styles.dropdownOption} ${filterFilm === "" ? styles.dropdownOptionActive : ""}`}
                    onClick={() => { setFilterFilm(""); setIsFilterFilmOpen(false); }}
                  >
                    <div className={styles.optionTitle}>Semua Film</div>
                    {filterFilm === "" && <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>}
                  </button>
                  {films.map((film) => (
                    <button
                      key={film.id}
                      type="button"
                      className={`${styles.dropdownOption} ${filterFilm === film.id.toString() ? styles.dropdownOptionActive : ""}`}
                      onClick={() => { setFilterFilm(film.id.toString()); setIsFilterFilmOpen(false); }}
                    >
                      <div className={styles.optionTitle}>{film.judul}</div>
                      {filterFilm === film.id.toString() && <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className={styles.errorBox}>
            <p>⚠️ {error}</p>
          </div>
        )}

        {/* Comments Table */}
        <div className={styles.tableWrapper}>
          {loading ? (
            <div className={styles.loadingBox}>
              <p>Memuat komentar...</p>
            </div>
          ) : filteredComments.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Pengguna</th>
                  <th>Film</th>
                  <th>Komentar</th>
                  <th>Tanggal</th>
                  <th className={styles.actionColumn}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredComments.map((comment) => (
                  <tr key={comment.id_comment} className={styles.tableRow}>
                    <td className={styles.username}>
                      <span className={styles.badge}>{comment.username}</span>
                    </td>
                    <td className={styles.filmTitle}>{comment.judul_film}</td>
                    <td className={styles.commentText}>
                      <span title={comment.komentar}>
                        {comment.komentar.length > 100
                          ? comment.komentar.substring(0, 100) + "..."
                          : comment.komentar}
                      </span>
                    </td>
                    <td className={styles.date}>
                      {formatDate(comment.tanggal)}
                    </td>
                    <td className={styles.actionColumn}>
                      <button
                        onClick={() =>
                          setConfirmModal({
                            isOpen: true,
                            id: comment.id_comment,
                          })
                        }
                        className={styles.deleteBtn}
                        title="Hapus komentar"
                      >
                        🗑️ Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.emptyBox}>
              <p>
                📝{" "}
                {searchTerm || filterFilm
                  ? "Tidak ada komentar yang ditemukan"
                  : "Belum ada komentar"}
              </p>
            </div>
          )}
        </div>

        {/* Results Info */}
        {filteredComments.length > 0 && (
          <div className={styles.resultsInfo}>
            <p>
              Menampilkan {filteredComments.length} dari {comments.length}{" "}
              komentar
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default KelolaKomentar;
