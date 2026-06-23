import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaExclamationCircle } from "react-icons/fa";
import { useState } from "react";
import API from "../../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    if (form.password !== form.confirmPassword) {
      setError("Password dan konfirmasi password tidak sama");
      setLoading(false);
      return;
    }

    try {
      const response = await API.post("/api/auth/register", {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      if (response.data.success) {
        alert("Registrasi berhasil! Silakan login.");
        navigate("/login");
      } else {
        setError(response.data.message || "Registrasi gagal");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Terjadi kesalahan saat registrasi",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-overlay"></div>
      <div className="register-background-glow"></div>

      <button className="register-back-btn" onClick={() => navigate("/")}>
        ← Kembali
      </button>

      <div className="register-wrapper">
        <div className="register-logo">
          <h1>PopTube</h1>
          <p>Join the ultimate cinematic experience.</p>
        </div>

        <div className="register-card">
          <form onSubmit={handleSubmit}>
            {/* USERNAME */}
            <div className="register-input-group">
              <label>Username</label>
              <div className="register-input-wrapper">
                <FaUser className="register-input-icon" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="register-input-group">
              <label>Email Address</label>
              <div className="register-input-wrapper">
                <FaEnvelope className="register-input-icon" />
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
            <div className="register-input-group">
              <label>Password</label>
              <div className="register-input-wrapper">
                <FaLock className="register-input-icon" />
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

            {/* CONFIRM PASSWORD */}
            <div className="register-input-group">
              <label>Confirm Password</label>
              <div className="register-input-wrapper">
                <FaLock className="register-input-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="register-error-box">
                <FaExclamationCircle className="error-icon" />
                <span>{error}</span>
              </div>
            )}

            {/* BUTTON */}
            <button
              className="register-signup-btn"
              type="submit"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <div className="register-spinner"></div>
              ) : (
                "Sign Up →"
              )}
            </button>
          </form>

          <div className="register-line"></div>

          <p className="signin-text">
            Already have an account?
            <Link to="/login"> Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
