import { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import API from "../../services/api";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./DetailFilm.css";

function DetailFilm() {
  const { id } = useParams();

  const navigate = useNavigate();
  const commentsListRef = useRef(null);

  const [movie, setMovie] = useState(null);
  const [saved, setSaved] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // State untuk fitur komentar
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deletingCommentId, setDeletingCommentId] = useState(null);

  useEffect(() => {
    getDetailMovie();
    checkWatchlist();
    recordHistory();
    fetchComments();
  }, []);

  // Handle click outside menu to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        commentsListRef.current &&
        !commentsListRef.current.contains(event.target)
      ) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function getDetailMovie() {
    try {
      const response = await API.get(`/api/film/${id}`);
      setMovie(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function checkWatchlist() {
    try {
      const token = localStorage.getItem("authToken");

      // kalau belum login skip
      if (!token) return;

      const response = await API.get("/api/watchlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const isSaved = response.data.data.some((item) => item.id_film == id);

      setSaved(isSaved);
    } catch (error) {
      console.log(error);
    }
  }

  async function recordHistory() {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      await API.post(
        "/api/history",
        { id_film: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.log("Failed to record history:", error);
    }
  }

  async function toggleWatchlist() {
    const token = localStorage.getItem("authToken");

    // Jika belum login
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    try {
      if (!saved) {
        await API.post(
          "/api/watchlist",
          {
            id_film: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setSaved(true);
      } else {
        const response = await API.get("/api/watchlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const movieSaved = response.data.data.find(
          (item) => item.id_film == id,
        );

        if (movieSaved) {
          await API.delete(`/api/watchlist/${movieSaved.id_watchlist}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        setSaved(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Mengambil komentar dari API
  async function fetchComments() {
    try {
      setLoadingComments(true);
      const response = await API.get(`/api/comments/${id}`);
      setComments(response.data);
    } catch (error) {
      console.log("Failed to fetch comments:", error);
    } finally {
      setLoadingComments(false);
    }
  }

  // Mengirim komentar baru
  async function handleSubmitComment(e) {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    // Jika belum login, tampilkan modal
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    if (!newComment.trim() || newComment.trim().length < 3) return;

    try {
      setSubmittingComment(true);
      await API.post(
        "/api/comments",
        {
          id_film: id,
          komentar: newComment.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setNewComment("");
      // Refresh komentar setelah mengirim
      await fetchComments();
    } catch (error) {
      console.log("Failed to submit comment:", error);
    } finally {
      setSubmittingComment(false);
    }
  }

  // Helper: format tanggal komentar
  function formatCommentDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMin < 1) return "Baru saja";
    if (diffMin < 60) return `${diffMin} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays < 7) return `${diffDays} hari lalu`;

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  // Helper: generate avatar initials dari username
  function getAvatarInitial(username) {
    if (!username) return "?";
    return username.charAt(0).toUpperCase();
  }

  // Helper: generate warna avatar berdasarkan username
  function getAvatarColor(username) {
    if (!username) return "#ff1e42";
    const colors = [
      "#ff1e42",
      "#e91e63",
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#2196f3",
      "#00bcd4",
      "#009688",
      "#4caf50",
      "#ff9800",
      "#ff5722",
      "#795548",
    ];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  // Function untuk menghapus komentar
  async function handleDeleteComment(commentId) {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setShowLoginModal(true);
      return;
    }

    try {
      setDeletingCommentId(commentId);
      await API.delete(`/api/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh komentar setelah menghapus
      await fetchComments();
      setDeleteConfirmId(null);
      setOpenMenuId(null);
    } catch (error) {
      console.log("Failed to delete comment:", error);
    } finally {
      setDeletingCommentId(null);
    }
  }

  // Fungsi helper untuk mendeteksi tipe URL gambar (eksternal vs lokal)
  const getImageUrl = (url) => {
    if (!url)
      return "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=300";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `http://localhost:3000/uploads/${url}`;
  };

  // Fungsi helper untuk mengubah link YouTube biasa menjadi link Embed yang bisa diputar di iframe
  const getEmbedUrl = (url) => {
    if (!url) return null;

    // YouTube Short URL
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1].split("?")[0];
      return {
        type: "iframe",
        url: `https://www.youtube.com/embed/${id}`,
      };
    }

    // YouTube Normal URL
    if (url.includes("youtube.com/watch?v=")) {
      const id = url.split("v=")[1].split("&")[0];
      return {
        type: "iframe",
        url: `https://www.youtube.com/embed/${id}`,
      };
    }

    // Vimeo
    if (url.includes("vimeo.com")) {
      const id = url.split("/").pop();
      return {
        type: "iframe",
        url: `https://player.vimeo.com/video/${id}`,
      };
    }

    // Google Drive
    if (url.includes("drive.google.com")) {
      const match = url.match(/\/d\/(.*?)\//);

      if (match && match[1]) {
        return {
          type: "iframe",
          url: `https://drive.google.com/file/d/${match[1]}/preview`,
        };
      }
    }

    // File MP4 langsung
    if (url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg")) {
      return {
        type: "video",
        url,
      };
    }

    return null;
  };

  if (!movie) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <h1>Memuat Detail Film...</h1>
      </div>
    );
  }

  const videoData = getEmbedUrl(movie.video_url);
  const isLoggedIn = !!localStorage.getItem("authToken");

  return (
    <>
      <Navbar />

      <div className="detail-container">
        {/* Poster Blur Efek Latar Belakang Sinematik */}
        <div className="detail-backdrop">
          <img
            src={getImageUrl(movie.foto_url)}
            alt=""
            className="detail-backdrop-img"
            referrerPolicy="no-referrer"
          />
          <div className="detail-backdrop-overlay"></div>
        </div>

        {/* 🍿 MODE BIOSKOP (THEATER MODE): Layar Lebar Megah di Atas Halaman Detail */}
        {videoData && (
          <div className="cinema-theater">
            <span className="theater-badge">🍿 MODE BIOSKOP AKTIF</span>

            <div className="cinema-screen">
              {videoData.type === "iframe" ? (
                <iframe
                  src={`${videoData.url}?autoplay=1`}
                  title={movie.judul}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video controls autoPlay>
                  <source src={videoData.url} />
                  Browser Anda tidak mendukung video.
                </video>
              )}
            </div>
          </div>
        )}

        <div className="detail-content">
          <div className="detail-left">
            <img
              src={getImageUrl(movie.foto_url)}
              alt={movie.judul}
              className="detail-poster"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="detail-right">
            <span className="movie-badge">Streaming Now</span>
            <h1 className="movie-title">{movie.judul}</h1>

            <p className="movie-description">{movie.deskripsi}</p>

            {/* Jika format video_url bukan YouTube, sajikan tombol putar eksternal */}
            {!videoData && movie.video_url && (
              <div className="video-fallback">
                <a
                  href={movie.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="watch-btn"
                >
                  ▶️ Tonton Film Sekarang
                </a>
              </div>
            )}

            <div className="action-buttons">
              <button
                className={`bookmark-btn ${saved ? "saved" : ""}`}
                onClick={toggleWatchlist}
              >
                {saved ? "✓ Batal Simpan" : "+ Simpan"}
              </button>

              <Link to="/" className="back-btn">
                ← Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
        {/* ========================= */}
        {/* 💬 SECTION KOMENTAR       */}
        {/* ========================= */}
        <div className="comments-section" id="comments-section">
          <div className="comments-header">
            <div className="comments-title-row">
              <h2 className="comments-title">💬 Komentar</h2>
              <span className="comments-count">{comments.length} Komentar</span>
            </div>
          </div>

          {/* Form Komentar */}
          {isLoggedIn ? (
            <form className="comment-form" onSubmit={handleSubmitComment}>
              <div className="comment-input-wrapper">
                <textarea
                  id="comment-input"
                  className="comment-input"
                  placeholder="Tulis komentarmu tentang film ini..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  maxLength={500}
                  disabled={submittingComment}
                />
                <div className="comment-input-footer">
                  <span className="comment-char-count">
                    {newComment.length}/500
                  </span>
                  <button
                    type="submit"
                    className="comment-submit-btn"
                    disabled={submittingComment || newComment.trim().length < 3}
                  >
                    {submittingComment ? (
                      <span className="comment-submit-loading">
                        <span className="mini-spinner"></span>
                        Mengirim...
                      </span>
                    ) : (
                      "Kirim Komentar"
                    )}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="comment-login-prompt">
              <span className="comment-login-icon">🔒</span>
              <p>
                Kamu harus{" "}
                <Link to="/login" className="comment-login-link">
                  login
                </Link>{" "}
                terlebih dahulu untuk berkomentar.
              </p>
            </div>
          )}

          {/* Daftar Komentar */}
          <div className="comments-list" ref={commentsListRef}>
            {loadingComments ? (
              <div className="comments-loading">
                <div className="mini-spinner"></div>
                <p>Memuat komentar...</p>
              </div>
            ) : comments.length === 0 ? (
              <div className="comments-empty">
                <span className="comments-empty-icon">💭</span>
                <p>Belum ada komentar. Jadilah yang pertama berkomentar!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div className="comment-card" key={comment.id_comment}>
                  <div
                    className="comment-avatar"
                    style={{
                      background: `linear-gradient(135deg, ${getAvatarColor(comment.username)}, ${getAvatarColor(comment.username)}aa)`,
                    }}
                  >
                    {getAvatarInitial(comment.username)}
                  </div>
                  <div className="comment-body">
                    <div className="comment-meta">
                      <span className="comment-username">
                        {comment.username}
                      </span>
                      <span className="comment-date">
                        {formatCommentDate(comment.tanggal)}
                      </span>
                      <div className="comment-menu-wrapper">
                        <button
                          className="comment-menu-btn"
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === comment.id_comment
                                ? null
                                : comment.id_comment,
                            )
                          }
                        >
                          ⋮
                        </button>
                        {openMenuId === comment.id_comment && (
                          <div className="comment-menu-dropdown">
                            <button
                              className="comment-menu-item delete"
                              onClick={() =>
                                setDeleteConfirmId(comment.id_comment)
                              }
                            >
                              🗑️ Hapus
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="comment-text">{comment.komentar}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="login-modal-overlay">
          <div className="login-modal">
            <div className="login-modal-icon">🔒</div>

            <h2 className="login-modal-title">Login Diperlukan</h2>

            <p className="login-modal-text">
              Kamu harus login terlebih dahulu untuk menyimpan film ke
              watchlist.
            </p>

            <div className="login-modal-actions">
              <button
                className="modal-cancel-btn"
                onClick={() => setShowLoginModal(false)}
              >
                Nanti Saja
              </button>

              <button
                className="modal-login-btn"
                onClick={() => navigate("/login")}
              >
                Login Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE COMMENT CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="comment-delete-overlay">
          <div className="comment-delete-modal">
            <div className="comment-delete-icon">⚠️</div>
            <h3 className="comment-delete-title">Hapus Komentar?</h3>
            <p className="comment-delete-text">
              Apakah kamu yakin ingin menghapus komentar ini? Tindakan ini tidak
              dapat dibatalkan.
            </p>
            <div className="comment-delete-actions">
              <button
                className="comment-delete-cancel"
                onClick={() => setDeleteConfirmId(null)}
                disabled={deletingCommentId !== null}
              >
                Batal
              </button>
              <button
                className="comment-delete-confirm"
                onClick={() => handleDeleteComment(deleteConfirmId)}
                disabled={deletingCommentId !== null}
              >
                {deletingCommentId === deleteConfirmId ? (
                  <span className="delete-loading">Menghapus...</span>
                ) : (
                  "Hapus"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default DetailFilm;
