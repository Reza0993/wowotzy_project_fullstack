import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEyeSlash, FaRedo } from "react-icons/fa";
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
        alert("Registrasi berhasil!");

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

      <button className="register-back-btn" onClick={() => navigate("/")}>
        ← Kembali
      </button>

      <div className="register-card">
        <h1 className="logo">PopTube</h1>

        <p className="subtitle">Join the ultimate cinematic experience.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <FaUser className="icon" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <FaLock className="icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <FaEyeSlash className="eye-icon" />
          </div>

          <div className="input-box">
            <FaRedo className="icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <div
              style={{
                color: "#e74c3c",
                marginBottom: "12px",
              }}
            >
              {error}
            </div>
          )}

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up →"}
          </button>
        </form>

        <p className="signin-text">
          Already have an account?
          <Link to="/login"> Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
