import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaExclamationCircle } from "react-icons/fa";
import API from "../../services/api"; // pastikan kamu punya file api.js untuk axios instance

function Login() {
  const navigate = useNavigate();

  // State
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/api/auth/login", form);

      const token = res.data.token || res.data.data?.token;

      if (!token) {
        setError("Login gagal: token tidak ditemukan");
        setLoading(false);
        return;
      }

      localStorage.setItem("authToken", token);

      navigate("/");

      window.location.reload();
    } catch (err) {
      setError(
        err.response?.data?.message || "Login gagal, periksa email/password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cinema-login-page">
      <div className="cinema-overlay"></div>
      <div className="cinema-background-glow"></div>

      <button className="cinema-back-btn" onClick={() => navigate("/")}>
        ← Kembali
      </button>

      <div className="cinema-container">
        <div className="cinema-logo">
          <h1>PopTube</h1>
          <p>Enter the cinematic universe.</p>
        </div>

        <div className="cinema-card">
          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="cinema-input-group">
              <label>Email Address</label>
              <div className="cinema-input-wrapper">
                <FaEnvelope className="cinema-input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="cinema-input-group">
              <div className="password-top">
                <label>Password</label>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>
              <div className="cinema-input-wrapper">
                <FaLock className="cinema-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="cinema-error-box">
                <FaExclamationCircle className="error-icon" />
                <span>{error}</span>
              </div>
            )}

            {/* BUTTON */}
            <button
              className="cinema-login-btn"
              type="submit"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <div className="login-spinner"></div>
              ) : (
                "Login →"
              )}
            </button>
          </form>

          <div className="cinema-line"></div>

          <div className="cinema-footer">
            New to PopTube?
            <Link to="/register"> Register now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
