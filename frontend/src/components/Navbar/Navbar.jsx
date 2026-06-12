import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ searchQuery, setSearchQuery, onScrollTo, onTriggerToast }) {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState(null); // <-- new

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const token = localStorage.getItem("authToken");
  const isLoggedIn = !!token;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    const handleResize = () => {
      if (window.innerWidth <= 768) setSearchExpanded(false);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Fetch profile when logged in
  useEffect(() => {
    let mounted = true;

    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) return;

      try {
        const res = await fetch("http://localhost:3000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (mounted && data.success) {
          setUsername(data.data.username);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, [isLoggedIn]);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUsername(null);
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      {/* LEFT */}
      <div className="navbar-left">
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

      {/* DESKTOP NAV */}
      <nav className="navbar-nav">
        <span
          className={`nav-link ${isHomePage ? "active" : ""}`}
          onClick={() => {
            if (isHomePage) {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            } else {
              navigate("/");
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

        {isLoggedIn && (
          <span className="nav-link" onClick={() => navigate("/watchlist")}>
            Daftar Saya
          </span>
        )}
      </nav>

      {/* DESKTOP RIGHT */}
      <div className="navbar-right">
        <div className="search-container">
          <button
            className="search-btn"
            onClick={() => setSearchExpanded(!searchExpanded)}
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
            />
          )}
        </div>

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
          <div className="profile-container relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
              alt="profile"
              className="navbar-avatar cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {dropdownOpen && (
              <div className="profile-dropdown absolute right-0 mt-2 w-48 bg-[#1a080a]/90 text-white rounded-md shadow-lg">
                <div className="dropdown-header p-3 border-b border-gray-700">
                  <div className="flex flex-col">
                    <span className="font-semibold truncate">
                      {username || "User"}
                    </span>

                    <span className="text-sm text-gray-400">
                      Premium Member
                    </span>
                  </div>
                </div>
                <button
                  className="dropdown-item w-full text-left px-4 py-2 hover:!bg-red-600 rounded-md"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* HAMBURGER BUTTON */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <span
            className="mobile-link"
            onClick={() => {
              if (isHomePage) {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              } else {
                navigate("/");
              }
            }}
          >
            Home
          </span>
          <span
            className="mobile-link"
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
            className="mobile-link"
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
          {isLoggedIn && (
            <span
              className="mobile-link"
              onClick={() => navigate("/watchlist")}
            >
              Daftar Saya
            </span>
          )}

          {isLoggedIn ? (
            <div className="profile-container relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
                alt="profile"
                className="navbar-avatar cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
                <div className="profile-dropdown absolute right-0 mt-2 w-48 bg-[#1a080a]/90 text-white rounded-md shadow-lg">
                  {/* <div className="dropdown-header p-3 border-b border-gray-700">
                    <span className="font-semibold">User</span>
                    <span className="block text-sm text-gray-400">
                      Premium Member
                    </span>
                  </div> */}
                  <button
                    className="dropdown-item w-full text-left px-4 py-2 hover:!bg-red-600 rounded-md"
                    onClick={() => {
                      localStorage.removeItem("authToken");
                      navigate("/login");
                      window.location.reload();
                    }}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/register" className="register-btn">
                Register
              </Link>
              <Link to="/login" className="login-btn">
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
