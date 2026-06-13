import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import API from "../../services/api";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState({ username: "User", role: "member" });
  const [history, setHistory] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileData();
    fetchHistoryData();
    fetchWatchlistData();
  }, []);

  const fetchProfileData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return navigate("/login");

    try {
      const res = await fetch("http://localhost:3000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHistoryData = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch("http://localhost:3000/api/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.success) {
        // Only show up to 4 recent history items
        setHistory(result.data.slice(0, 4));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchWatchlistData = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const res = await API.get("/api/watchlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        // Only show up to 4 recent watchlist items
        setWatchlist(res.data.data.slice(0, 4));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getImageUrl = (url) => {
    if (!url) {
      return "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=300";
    }
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `http://localhost:3000/uploads/${url}`;
  };

  return (
    <div className="profile-page-container">
      <Navbar />

      <div className="profile-content">
        {/* User Header */}
        <div className="profile-header">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
            alt="profile"
            className="profile-avatar"
          />
          <div className="profile-info">
            <h1 className="profile-name">{user.username}</h1>
            <p className="profile-handle">
              @{user.username.toLowerCase().replace(/\s/g, "")} •{" "}
              {user.role === "admin" ? "Admin" : "Premium Member"}
            </p>
          </div>
          <button className="edit-profile-btn" onClick={() => navigate("/edit-profile")}>Edit Profile</button>
        </div>

        {/* History Section */}
        <div className="profile-section">
          <div className="section-header">
            <h2>
              <Link to="/history" className="section-link">
                Histori <span>&gt;</span>
              </Link>
            </h2>
          </div>
          {history.length > 0 ? (
            <div className="horizontal-list">
              {history.map((item) => (
                <div key={item.id_history} className="card-item">
                  <div className="thumbnail-wrapper">
                    <img src={getImageUrl(item.foto_url)} alt={item.judul} />
                  </div>
                  <div className="card-details">
                    <p className="card-title">{item.judul}</p>
                    <p className="card-subtitle">
                      Ditonton: {new Date(item.waktu_nonton).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-text">Belum ada history tontonan</p>
          )}
        </div>

        {/* Watchlist Section */}
        <div className="profile-section">
          <div className="section-header">
            <h2>
              <Link to="/watchlist" className="section-link">
                Playlist <span>&gt;</span>
              </Link>
            </h2>
          </div>
          {watchlist.length > 0 ? (
            <div className="horizontal-list">
              {watchlist.map((item) => (
                <div key={item.id_watchlist} className="card-item">
                  <div className="thumbnail-wrapper">
                    <img src={getImageUrl(item.foto_url)} alt={item.judul} />
                  </div>
                  <div className="card-details">
                    <p className="card-title">{item.judul}</p>
                    <p className="card-subtitle">Tersimpan di Playlist</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-text">Belum ada film di playlist</p>
          )}
        </div>
      </div>
    </div>
  );
}
