import { useEffect, useState } from "react";
import "./history.css";
import Navbar from "../../components/Navbar/Navbar";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        setHistory(result.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteHistory = async (id) => {
    const token = localStorage.getItem("authToken");

    if (!window.confirm("Hapus history ini?")) return;

    try {
      const response = await fetch(`http://localhost:3000/api/history/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        loadHistory();
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

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="history-page">
      <Navbar />
      <div className="history-header">
        <div>
          <h1>Watch History</h1>
          <p>Manage your viewing activity</p>
        </div>
      </div>

      {loading ? (
        <p className="loading">Loading history...</p>
      ) : history.length === 0 ? (
        <div className="empty-history">
          <p>Belum ada history tontonan</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div key={item.id_history} className="history-card">
              <div className="thumbnail">
                <img
                  src={getImageUrl(item.foto_url)}
                  alt={item.judul}
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="history-content">
                <div className="card-header">
                  <h3>{item.judul}</h3>

                  <button
                    className="delete-btn"
                    onClick={() => deleteHistory(item.id_history)}
                  >
                    Hapus
                  </button>
                </div>

                <p className="description">{item.deskripsi}</p>

                <p className="watch-date">
                  Ditonton:{" "}
                  {item.waktu_nonton
                    ? new Date(item.waktu_nonton).toLocaleString("id-ID")
                    : "-"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
