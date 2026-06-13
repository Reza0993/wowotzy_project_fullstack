import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./sidebar.css";

/* Logo */
const LogoSVG = () => (
  <svg
    className="logo-svg-sidebar"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 5V19L19 12L8 5Z" fill="url(#logo-grad-sidebar)" />

    <defs>
      <linearGradient id="logo-grad-sidebar" x1="8" y1="5" x2="19" y2="19">
        <stop stopColor="#ff1e42" />
        <stop offset="1" stopColor="#a30018" />
      </linearGradient>
    </defs>
  </svg>
);

/* Icons */
const IconDashboard = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      d="M3 13h8V3H3v10zM3 21h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z"
      fill="currentColor"
    />
  </svg>
);

const IconFilm = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24">
    <rect
      x="4"
      y="4"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M7 7h2M7 11h2M7 15h2M15 7h2M15 11h2M15 15h2"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

const IconComment = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
    />
  </svg>
);

const IconUser = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20a8 8 0 0 1 16 0"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
    />
  </svg>
);

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    role: "",
  });

  const accountRef = useRef(null);

  const items = [
    { to: "/dasboardAdmin", label: "Dashboard", icon: IconDashboard },
    { to: "/dasboardAdmin/films", label: "Kelola Film", icon: IconFilm },
    {
      to: "/dasboardAdmin/comments",
      label: "Kelola Komentar",
      icon: IconComment,
    },
    { to: "/dasboardAdmin/users", label: "Kelola User", icon: IconUser },
  ];

  useEffect(() => {
    const handleOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);

    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);
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
          setUser({
            username: data.data.username,
            role: data.data.role,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleLogout = () => {
    //localStorage.removeItem("authToken");

    navigate("/");

    window.location.reload();
  };

  return (
    <aside className={`sidebar ${isCollapsed ? "sidebar--collapsed" : ""}`}>
      {/* TOP */}
      <div className="sidebar__top-controls">
        <button className="sidebar__close-btn" onClick={toggleSidebar}>
          {isCollapsed ? "☰" : "✕"}
        </button>
      </div>

      {/* BRAND */}
      <div className="sidebar__brand">
        <div className="sidebar__logo">
          <LogoSVG />
        </div>

        {!isCollapsed && (
          <div className="sidebar__title flex flex-col">
            <span className="sidebar__title-main">PopTube</span>

            <span className="sidebar__title-sub">Panel Admin</span>
          </div>
        )}
      </div>

      {/* MENU */}
      <nav className="sidebar__nav">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar__item ${isActive ? "sidebar__item--active" : ""}`
              }
            >
              <div className="sidebar__icon-wrap">
                <Icon className="sidebar__icon" />
              </div>

              {!isCollapsed && (
                <span className="sidebar__label">{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* ACCOUNT FOOTER */}
      <div className="sidebar__footer" ref={accountRef}>
        <div
          className={`sidebar__account-dropup ${accountOpen ? "is-open" : ""}`}
        >
          <div className="sidebar__dropup-header">
            <div className="sidebar__avatar sidebar__avatar--large">
              {user.username?.charAt(0)?.toUpperCase() || "A"}
            </div>

            <div>
              <div className="sidebar__account-name">
                {user.username || "Admin"}
              </div>

              <div className="sidebar__account-email">
                {user.role || "Administrator"}
              </div>
            </div>
          </div>

          <button className="sidebar__logout" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <button
          className="sidebar__account-btn-footer"
          onClick={() => setAccountOpen((prev) => !prev)}
        >
          <div className="sidebar__avatar">
            {user.username?.charAt(0)?.toUpperCase() || "A"}
          </div>

          {!isCollapsed && (
            <>
              <div className="sidebar__user-info">
                <span className="sidebar__user-name">
                  {user.username || "Admin"}
                </span>

                <span className="sidebar__user-role">
                  {user.role || "Administrator"}
                </span>
              </div>

              <span className="sidebar__account-arrow">▼</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
