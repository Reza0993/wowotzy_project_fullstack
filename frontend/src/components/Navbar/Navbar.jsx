import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({
  searchQuery,
  setSearchQuery,
  onScrollTo,
  onTriggerToast,
  isLoggedIn,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  // Efek transisi mengecilkan navbar saat digulir (Scroll Shrink)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-left">
        {/* Logo Utama dengan Ikon SVG Play Premium */}
        <Link
          to="/"
          className="navbar-logo-link"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="navbar-logo">
            <svg
              className="logo-svg"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 5V19L19 12L8 5Z" fill="url(#logo-grad)" />
              <defs>
                <linearGradient
                  id="logo-grad"
                  x1="8"
                  y1="5"
                  x2="19"
                  y2="19"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#ff1e42" />
                  <stop offset="1" stopColor="#a30018" />
                </linearGradient>
              </defs>
            </svg>
            <h1>PopTube</h1>
          </div>
        </Link>
      </div>

      {/* Tautan Navigasi Sinematik Desktop */}
      <nav className="navbar-nav">
        <span
          className={`nav-link ${isHomePage ? "active" : ""}`}
          onClick={() => {
            if (isHomePage) {
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              navigate("/");
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 100);
            }
          }}
        >
          Home
        </span>
        <span
          className="nav-link"
          onClick={() => {
            if (isHomePage && onScrollTo) {
              onScrollTo(".movie-row:nth-of-type(2)");
            } else {
              navigate("/?scroll=2");
            }
          }}
        >
          Film Terpopuler
        </span>
        <span
          className="nav-link"
          onClick={() => {
            if (isHomePage && onScrollTo) {
              onScrollTo(".movie-row:nth-of-type(3)");
            } else {
              navigate("/?scroll=3");
            }
          }}
        >
          Rilis Baru
        </span>
        <span
          className="nav-link"
          onClick={() =>
            onTriggerToast(
              "📋 Daftar Saya: Film kesayangan Anda telah disimpan di bookmark lokal! 🌟",
            )
          }
        >
          Daftar Saya
        </span>
      </nav>

      <div className="navbar-right">
        {/* Kolom Pencarian Dinamis Netflix-Style yang Meluncur Keluar */}
        <div className={`search-container ${searchExpanded ? "expanded" : ""}`}>
          <button
            className="search-btn"
            onClick={() => setSearchExpanded(!searchExpanded)}
            title="Cari Film"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          {searchExpanded && (
            <input
              type="text"
              placeholder="Cari judul film..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              autoFocus
            />
          )}
        </div>

        {/* Jika belum login → tampilkan tombol Register & Login */}
        {!isLoggedIn ? (
          <div className="flex gap-3">
            <Link to="/register" className="register-btn">
              Register
            </Link>

            <Link to="/login" className="login-btn">
              Login
            </Link>
          </div>
        ) : (
          /* Jika sudah login → avatar + dropdown */
          <div className="profile-container">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
              alt="profile"
              className="navbar-avatar"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
                    alt=""
                  />
                  <div>
                    <span className="user-name">Fiona Princess</span>
                    <span className="user-status">Premium Member</span>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <span
                  className="dropdown-item logout"
                  onClick={() => onTriggerToast("🚪 Anda berhasil keluar!")}
                >
                  🚪 Keluar
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
