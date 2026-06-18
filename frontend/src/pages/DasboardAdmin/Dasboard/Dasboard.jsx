import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import api from "../../../services/api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// 1. PERBAIKAN IMPORT (Sesuaikan dengan nama file di struktur folder)
import style from "./Dasboard.module.css";

dayjs.extend(relativeTime);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

function StatCard({ title, value, sub }) {
  return (
    // Menggabungkan CSS Module dan class global 'group'
    <div className={`${style["stat-card"]} group`}>
      <div className={style["stat-title"]}>{title}</div>
      <div className={style["stat-value"]}>{value ?? 0}</div>
      {sub && <div className={style["stat-sub"]}>{sub}</div>}
    </div>
  );
}

function ActivityItem({ item }) {
  const created = item.created_at || item.tanggal || item.createdAt;
  const time = created ? dayjs(created).fromNow() : "-";
  if (item.type === "new_user") {
    return (
      <div className={style["activity-item"]}>
        🟢 <strong>{item.name}</strong> mendaftar —{" "}
        <span className={style.time}>{time}</span>
      </div>
    );
  }
  if (item.type === "new_comment") {
    return (
      <div className={style["activity-item"]}>
        💬 <strong>{item.user || "User"}</strong> berkomentar: "
        {item.comment?.slice(0, 80)}" —{" "}
        <span className={style.time}>{time}</span>
      </div>
    );
  }
  if (item.type === "new_film") {
    return (
      <div className={style["activity-item"]}>
        🎬 Film baru: <strong>{item.title}</strong> —{" "}
        <span className={style.time}>{time}</span>
      </div>
    );
  }
  return (
    <div className={style["activity-item"]}>
      • Aktivitas — <span className={style.time}>{time}</span>
    </div>
  );
}

function Dasboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: 0,
    films: 0,
    comments: 0,
    viewers: 0,
    totalWatchTimeSeconds: 0,
    growth: [],
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setError(null);
      const res = await api.get("/api/stats");

      if (res.data && res.data.success) {
        setStats(res.data.data);
      } else {
        setError("Gagal mengambil statistik");
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login");
        return;
      }
      setError("Terjadi kesalahan saat memuat statistik");
    } finally {
      setLoading(false);
    }
  };

  const fetchActivities = async () => {
    try {
      setLoadingActivities(true);
      const res = await api.get("/api/activities");
      if (res.data && res.data.success) {
        setActivities(res.data.data);
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login");
        return;
      }
    } finally {
      setLoadingActivities(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchActivities();
    const interval = setInterval(() => {
      fetchStats();
      fetchActivities();
    }, 30_000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <div className={style["dashboard-page"]}>
        <Sidebar />
        <main className={style["dashboard-main"]}>Memuat dashboard...</main>
      </div>
    );

  if (error)
    return (
      <div className={style["dashboard-page"]}>
        <Sidebar />
        <main className={style["dashboard-main"]}>Error: {error}</main>
      </div>
    );

  // Chart data
  const labels = (stats?.growth || []).map((g) =>
    dayjs(g.date).format("DD MMM"),
  );
  const viewersData = (stats?.growth || []).map((g) => g.viewers);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Penonton per hari",
        data: viewersData,
        fill: true,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.12)",
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    interaction: { mode: "nearest", axis: "x", intersect: false },
    scales: {
      x: { display: true },
      y: { display: true, beginAtZero: true },
    },
  };

  const totalWatchHours = stats?.totalWatchTimeSeconds
    ? Math.round(stats.totalWatchTimeSeconds / 3600)
    : 0;

  return (
    <div className={style["dashboard-page"]}>
      <Sidebar />
      <main className={style["dashboard-main"]}>
        <div className={style["dashboard-header"]}>
          <div>
            <h1 className={style["dashboard-title"]}>Dashboard</h1>
            <p className={style["dashboard-subtitle"]}>
              Ringkasan statistik dan aktivitas platform
            </p>
          </div>
        </div>

        {/* Gabungan class CSS Module dan Utility class */}
        <section className={`${style["stats-grid"]} animate-fade-in`}>
          <StatCard title="Jumlah User" value={stats.users} />
          <StatCard title="Jumlah Film" value={stats.films} />
          <StatCard title="Jumlah Komentar" value={stats.comments} />
          <StatCard title="Jumlah Penonton" value={stats.viewers} />
          <StatCard
            title="Total Waktu Tontonan (jam)"
            value={totalWatchHours}
            sub={`${stats.totalWatchTimeSeconds || 0} detik`}
          />
        </section>

        <section className={style["chart-section"]}>
          {/* Gabungan class CSS Module dan Utility class */}
          <div
            className={`${style["chart-card"]} ${style["dashboard-card"]} transition-all duration-300`}
          >
            <h3>Grafik Pertumbuhan Penonton (30 hari)</h3>
            {labels.length === 0 ? (
              <div>Tidak ada data pertumbuhan</div>
            ) : (
              <Line data={chartData} options={chartOptions} />
            )}
          </div>

          {/* Gabungan class CSS Module dan Utility class */}
          <div
            className={`${style["activity-card"]} ${style["dashboard-card"]} transition-all duration-300`}
          >
            <h3>Aktivitas Terbaru</h3>
            <div className={style["activity-list"]}>
              {loadingActivities && <div>Memuat aktivitas...</div>}
              {!loadingActivities && activities.length === 0 && (
                <div>Tidak ada aktivitas</div>
              )}
              {!loadingActivities &&
                activities.map((a, idx) => <ActivityItem key={idx} item={a} />)}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dasboard;
