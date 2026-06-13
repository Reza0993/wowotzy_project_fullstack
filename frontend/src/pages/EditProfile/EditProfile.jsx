import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./EditProfile.css";

export default function EditProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return navigate("/login");

    try {
      const res = await API.get("/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        const { username, email } = res.data.data;
        setForm({ username, email, password: "" });
      }
    } catch (err) {
      console.error(err);
      showToast("Gagal memuat profil user", "error");
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3500);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("authToken");
    const updatePayload = {
      username: form.username,
      email: form.email,
    };

    if (form.password) {
      updatePayload.password = form.password;
    }

    try {
      const res = await API.put("/api/auth/profile", updatePayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        showToast("Profil berhasil diperbarui! ✨", "success");
        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || "Gagal memperbarui profil";
      showToast(errMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-page">
      <Navbar />

      {toast.show && (
        <div className={`premium-toast ${toast.type}`}>
          <span className="toast-icon">{toast.type === "success" ? "✨" : "❌"}</span>
          <span className="toast-message">{toast.message}</span>
        </div>
      )}

      <div className="edit-profile-container">
        <button className="back-to-profile-btn" onClick={() => navigate("/profile")}>
          ← Kembali ke Profil
        </button>

        <div className="edit-profile-card">
          <div className="edit-profile-header">
            <h2>Edit Profil Anda</h2>
            <p>Perbarui detail akun PopTube Anda di bawah ini.</p>
          </div>

          <div className="avatar-section">
            <div className="avatar-wrapper">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
                alt="Avatar"
                className="edit-avatar-img"
              />
              <div className="avatar-overlay">
                <span>📸</span>
              </div>
            </div>
            <p className="avatar-tip">Foto profil bawaan premium</p>
          </div>

          <form onSubmit={handleSubmit} className="edit-profile-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-with-icon">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Masukkan username baru"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Alamat Email</label>
              <div className="input-with-icon">
                <span className="input-icon">✉</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Masukkan email baru"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password Baru (Opsional)</label>
              <div className="input-with-icon">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Biarkan kosong jika tidak ingin diubah"
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/profile")}
                disabled={loading}
              >
                Batal
              </button>
              <button type="submit" className="save-btn" disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
