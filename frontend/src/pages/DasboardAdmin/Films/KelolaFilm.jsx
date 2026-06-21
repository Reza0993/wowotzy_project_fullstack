// KelolaFilm.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar"; // Sesuaikan path jika perlu
import Notification from "../../../components/Notification/Notification";
import KelolaFilmStyle from "./KelolaFilm.module.css";

function KelolaFilm() {
  const [films, setFilms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Notification State
  const [notification, setNotification] = useState({
    show: false,
    type: "info",
    message: "",
  });

  // Confirm Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    id: null,
  });

  // State Form disesuaikan dengan field di database
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    video_url: "",
    foto_url: null,
  });

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

  // Ganti port jika backend berjalan di port yang berbeda
  const API_URL = "http://localhost:3000/api/film";
  const IMAGE_BASE_URL = "http://localhost:3000/uploads/";

  // READ: Fetch semua film
  const fetchFilms = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      setFilms(result.data || []);
    } catch (error) {
      console.error("Gagal mengambil data film:", error);
      showNotification("error", "Gagal mengambil data film");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  // Handle Input (Teks & File)
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto_url") {
      setFormData({ ...formData, foto_url: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // CREATE & UPDATE: Submit data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    if (!token) {
      showNotification("error", "Anda harus login terlebih dahulu");
      return;
    }

    const data = new FormData();

    data.append("judul", formData.judul);
    data.append("deskripsi", formData.deskripsi);
    data.append("video_url", formData.video_url);

    if (formData.foto_url) {
      data.append("foto_url", formData.foto_url);
    }

    try {
      const url = isEditMode ? `${API_URL}/${currentId}` : API_URL;

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      console.log("Response:", result);

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Gagal menyimpan film",
        );
      }

      showNotification(
        "success",
        isEditMode ? "Film berhasil diperbarui" : "Film berhasil ditambahkan",
      );

      fetchFilms();
      closeModal();
    } catch (error) {
      console.error(error);
      showNotification("error", error.message);
    }
  };

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  // DELETE - Show confirmation modal
  const openDeleteConfirm = (id) => {
    setConfirmModal({
      isOpen: true,
      id,
    });
  };

  // DELETE - Execute deletion
  const confirmDelete = async () => {
    const id = confirmModal.id;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setConfirmModal({ isOpen: false, id: null });
      showNotification("success", "Film berhasil dihapus");
      fetchFilms();
    } catch (error) {
      console.error(error);
      showNotification("error", error.message);
    }
  };

  // Logika Buka/Tutup Modal
  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({ judul: "", deskripsi: "", video_url: "", foto_url: null });
    setIsModalOpen(true);
  };

  const openEditModal = (film) => {
    setIsEditMode(true);
    setCurrentId(film.id_film);
    setFormData({
      judul: film.judul || "",
      deskripsi: film.deskripsi || "",
      video_url: film.video_url || "",
      foto_url: null, // Kosong agar user hanya isi jika ingin mengubah gambar
    });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // Helper untuk merender URL gambar (Cek eksternal link vs file lokal)
  const renderImage = (foto) => {
    if (!foto) return "https://via.placeholder.com/150";
    if (foto.startsWith("http")) return foto;
    return `${IMAGE_BASE_URL}${foto}`;
  };

  return (
    <div className={KelolaFilmStyle.pageContainer}>
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
          className={KelolaFilmStyle.modalOverlay}
          onClick={() => setConfirmModal({ isOpen: false, id: null })}
        >
          <div
            className={KelolaFilmStyle.confirmModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={KelolaFilmStyle.confirmHeader}>
              <h3>⚠️ Hapus Film</h3>
            </div>
            <p className={KelolaFilmStyle.confirmMessage}>
              Apakah Anda yakin ingin menghapus film ini? Tindakan ini tidak
              dapat dibatalkan.
            </p>
            <div className={KelolaFilmStyle.confirmFooter}>
              <button
                onClick={() => setConfirmModal({ isOpen: false, id: null })}
                className={KelolaFilmStyle.cancelBtn}
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className={KelolaFilmStyle.confirmDeleteBtn}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <main className={KelolaFilmStyle.mainContent}>
        <div className={KelolaFilmStyle.headerSection}>
          <div>
            <h1 className={KelolaFilmStyle.pageTitle}>Kelola Film</h1>
            <p className={KelolaFilmStyle.pageSubtitle}>
              Kelola katalog film yang tersedia di PopTube
            </p>
          </div>

          <button onClick={openAddModal} className={KelolaFilmStyle.addButton}>
            + Tambah Film
          </button>
        </div>

        <section className={KelolaFilmStyle.statsGrid}>
          <div className={KelolaFilmStyle.statCard}>
            <span>Total Film</span>
            <h3>{films.length}</h3>
          </div>

          <div className={KelolaFilmStyle.statCard}>
            <span>Poster Tersimpan</span>
            <h3>{films.filter((f) => f.foto_url).length}</h3>
          </div>

          <div className={KelolaFilmStyle.statCard}>
            <span>Trailer Tersedia</span>
            <h3>{films.filter((f) => f.video_url).length}</h3>
          </div>
        </section>

        {/* Tabel Data Film */}
        <div className={KelolaFilmStyle.tableWrapper}>
          <table className={`w-full text-left border-collapse`}>
            <thead>
              <tr
                className={`border-b border-gray-700 ${KelolaFilmStyle.textSecondary}`}
              >
                <th className="py-3 px-4 font-medium">Poster</th>
                <th className="py-3 px-4 font-medium">Judul Film</th>
                <th className="py-3 px-4 font-medium">Deskripsi</th>
                <th className="py-3 px-4 font-medium">Trailer (Video URL)</th>
                <th className="py-3 px-4 font-medium text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {films.length > 0 ? (
                films.map((film) => (
                  <tr
                    key={film.id_film}
                    className={`${KelolaFilmStyle.tableRow} ${KelolaFilmStyle.textMain}`}
                  >
                    <td className="py-3 px-4">
                      <img
                        src={renderImage(film.foto_url)}
                        alt={film.judul}
                        className={KelolaFilmStyle.poster}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />
                    </td>
                    <td className="py-3 px-4 font-semibold">{film.judul}</td>
                    <td
                      className="py-3 px-4 max-w-xs truncate"
                      title={film.deskripsi}
                    >
                      {film.deskripsi}
                    </td>
                    <td className="py-3 px-4">
                      <a
                        href={film.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition underline truncate block max-w-xs"
                      >
                        {film.video_url}
                      </a>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => openEditModal(film)}
                          className={KelolaFilmStyle.editBtn}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteConfirm(film.id_film)}
                          className={KelolaFilmStyle.deleteBtn}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className={`py-6 text-center ${KelolaFilmStyle.textSecondary}`}
                  >
                    Belum ada data film. Silakan tambah data baru.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="overflow-x-auto"></div>
        </div>
      </main>

      {/* Modal Tambah / Edit */}
      {isModalOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center ${KelolaFilmStyle.modalOverlay}`}
        >
          <div
            className={`${KelolaFilmStyle.card} w-full max-w-2xl p-6 md:p-8 relative`}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className={`text-3xl font-bold ${KelolaFilmStyle.textMain}`}>
                {isEditMode ? "Edit Film" : "Tambah Film Baru"}
              </h2>

              <button
                type="button"
                onClick={closeModal}
                className={KelolaFilmStyle.closeBtn}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className={KelolaFilmStyle.modalForm}>
              <div className={KelolaFilmStyle.formGroup}>
                <label
                  className={`block mb-1 text-sm ${KelolaFilmStyle.textSecondary}`}
                >
                  Judul Film
                </label>
                <input
                  type="text"
                  name="judul"
                  required
                  value={formData.judul}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-md ${KelolaFilmStyle.modalInput}`}
                  placeholder="Masukkan judul film"
                />
              </div>

              <div>
                <label
                  className={`block mb-1 text-sm ${KelolaFilmStyle.textSecondary}`}
                >
                  Video URL (YouTube Trailer)
                </label>
                <input
                  type="url"
                  name="video_url"
                  required
                  value={formData.video_url}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-md ${KelolaFilmStyle.modalInput}`}
                  placeholder="https://youtu.be/..."
                />
              </div>

              <div>
                <label
                  className={`block mb-1 text-sm ${KelolaFilmStyle.textSecondary}`}
                >
                  Deskripsi Film
                </label>
                <textarea
                  name="deskripsi"
                  rows="6"
                  required
                  value={formData.deskripsi}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-md resize-none ${KelolaFilmStyle.modalInput}`}
                  placeholder="Tuliskan sinopsis atau deskripsi film..."
                ></textarea>
              </div>

              <div>
                <label className={KelolaFilmStyle.uploadArea}>
                  <input
                    type="file"
                    name="foto_url"
                    accept="image/*"
                    onChange={handleInputChange}
                    hidden
                  />

                  <span>📷 Pilih Poster Film</span>
                </label>
                {formData.foto_url && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={URL.createObjectURL(formData.foto_url)}
                      alt="Preview"
                      className={KelolaFilmStyle.previewImage}
                    />
                  </div>
                )}
              </div>

              <div className={KelolaFilmStyle.modalFooter}>
                <button
                  type="button"
                  onClick={closeModal}
                  className={KelolaFilmStyle.cancelBtn}
                >
                  Batal
                </button>

                <button type="submit" className={KelolaFilmStyle.saveBtn}>
                  {isEditMode ? "Simpan Perubahan" : "Simpan Film"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default KelolaFilm;
