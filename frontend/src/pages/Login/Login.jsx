import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  return (
    <div className="cinema-login-page">

      {/* OVERLAY */}
      <div className="cinema-overlay"></div>

      {/* BACK BUTTON */}
      <button
        className="cinema-back-btn"
        onClick={() => navigate("/")}
      >
        ← Kembali
      </button>

      {/* CONTAINER */}
      <div className="cinema-container">

        {/* LOGO */}
        <div className="cinema-logo">

          <h1>PopTube</h1>

          <p>Enter the cinematic universe.</p>

        </div>

        {/* CARD */}
        <div className="cinema-card">

          <form>

            {/* EMAIL */}
            <div className="cinema-input-group">

              <label>Email Address</label>

              <div className="cinema-input">

                <span>✉</span>

                <input
                  type="email"
                  placeholder="you@example.com"
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div className="cinema-input-group">

              <div className="password-top">

                <label>Password</label>

                <a href="#">
                  Forgot Password?
                </a>

              </div>

              <div className="cinema-input">

                <span>🔒</span>

                <input
                  type="password"
                  placeholder="••••••••"
                />

              </div>

            </div>

            {/* BUTTON */}
            <button className="cinema-login-btn">

              Login →

            </button>

          </form>

          {/* LINE */}
          <div className="cinema-line"></div>

          {/* FOOTER */}
          <div className="cinema-footer">

            New to PopTube?
            <Link to="/register">
              {" "}Register now
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;