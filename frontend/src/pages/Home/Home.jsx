import { useEffect, useState } from "react";

import API from "../../services/api";

import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import MovieRow from "../../components/MovieRow/MovieRow";
import BottomNav from "../../components/BottomNav/BottomNav";

import "./Home.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    getMovies();
  }, []);

  async function getMovies() {
    try {
      const response = await API.get("/api/film");
      setMovies(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Trigger Toast Notification dengan animasi bounce
  const triggerToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3500);
  };

  // Logika scroll halus ke baris film tertentu
  const scrollToSection = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Filter film secara instan saat pengguna mengetik di kolom pencarian
  const filteredMovies = movies.filter((movie) =>
    movie.judul.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Distribusikan hasil filter ke kategori film masing-masing
  const trendingMovies = filteredMovies.slice(0, 4);
  const popularMovies =
    filteredMovies.length > 4 ? filteredMovies.slice(4, 8) : filteredMovies;
  const actionMovies =
    filteredMovies.length > 8 ? filteredMovies.slice(8) : filteredMovies;

  return (
    <div className="home">
      {/* Toast Notification Glassmorphism Premium */}
      {toast.show && (
        <div className="premium-toast">
          <span className="toast-icon">✨</span>
          <span className="toast-message">{toast.message}</span>
        </div>
      )}

      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onScrollTo={scrollToSection}
        onTriggerToast={triggerToast}
      />

      <Hero movie={movies[0]} />

      <div className="home-content">
        {filteredMovies.length === 0 && searchQuery !== "" ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              color: "#a0a0a0",
            }}
          >
            <span style={{ fontSize: "50px" }}>🔍</span>
            <h2
              style={{
                color: "white",
                marginTop: "15px",
                fontFamily: "Plus Jakarta Sans",
              }}
            >
              Film Tidak Ditemukan
            </h2>
            <p style={{ fontSize: "14px", marginTop: "5px" }}>
              Maaf, tidak ada judul film yang cocok dengan "{searchQuery}". Coba
              kata kunci lain!
            </p>
          </div>
        ) : (
          <>
            <MovieRow
              title={
                searchQuery
                  ? `Hasil Pencarian untuk "${searchQuery}"`
                  : "Semua Film"
              }
              movies={filteredMovies}
            />

            {!searchQuery && (
              <>
                <MovieRow title="Trending Now" movies={trendingMovies} />

                <MovieRow title="Popular Movies" movies={popularMovies} />

                <MovieRow title="Action Thriller" movies={actionMovies} />
              </>
            )}
          </>
        )}
      </div>

      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onScrollTo={scrollToSection}
        onTriggerToast={triggerToast}
      />
    </div>
  );
}

export default Home;
