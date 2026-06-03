import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaCamera, FaEyeSlash, FaRedo } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="register-container">
      {/* Background Blur */}
      <div className="register-overlay"></div>

      {/* BACK BUTTON */}
      <button
        className="register-back-btn"
        onClick={() => navigate("/")}
      >
        ← Kembali
      </button>

      <div className="register-card">
        <h1 className="logo">PopTube</h1>
        <p className="subtitle">
          Join the ultimate cinematic experience.
        </p>

        {/* Upload Profile */}
        <div className="profile-upload">
          <label htmlFor="profile">
            <div className="upload-circle">
              <FaCamera className="camera-main-icon" />
              <div className="edit-badge">
                <span>+</span>
              </div>
            </div>
          </label>
          <input type="file" id="profile" hidden />
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-box">
            <FaUser className="icon" />
            <input type="text" placeholder="Username" />
          </div>

          <div className="input-box">
            <FaEnvelope className="icon" />
            <input type="email" placeholder="Email Address" />
          </div>

          <div className="input-box">
            <FaLock className="icon" />
            <input type="password" placeholder="Password" />
            <FaEyeSlash className="eye-icon" />
          </div>

          <div className="input-box">
            <FaRedo className="icon" />
            <input type="password" placeholder="Confirm Password" />
          </div>

          <button type="submit" className="signup-btn">
            Sign Up →
          </button>
        </form>

        <p className="signin-text">
          Already have an account?{" "}
          <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;