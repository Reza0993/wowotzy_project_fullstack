import "./BottomNav.css";

function BottomNav({ activeTab, setActiveTab, onScrollTo, onTriggerToast }) {
  const currentTab = activeTab || "home";

  return (
    <nav className="bottom-nav">
      
      <button 
        className={`bottom-nav-item ${currentTab === "home" ? "active" : ""}`}
        onClick={() => {
          if (setActiveTab) setActiveTab("home");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span>Home</span>
      </button>

      <button 
        className={`bottom-nav-item ${currentTab === "search" ? "active" : ""}`}
        onClick={() => {
          if (setActiveTab) setActiveTab("search");
          if (onTriggerToast) onTriggerToast("🔍 Silakan gunakan kolom pencarian yang meluncur indah di sudut kanan atas Navbar! 🚀");
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
        <span>Search</span>
      </button>

      <button 
        className={`bottom-nav-item ${currentTab === "coming-soon" ? "active" : ""}`}
        onClick={() => {
          if (setActiveTab) setActiveTab("coming-soon");
          if (onTriggerToast) onTriggerToast("⏳ Coming Soon: Film-film blockbuster baru akan rilis setiap akhir pekan! 🎬");
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        <span>Coming Soon</span>
      </button>

      <button 
        className={`bottom-nav-item ${currentTab === "downloads" ? "active" : ""}`}
        onClick={() => {
          if (setActiveTab) setActiveTab("downloads");
          if (onTriggerToast) onTriggerToast("📥 Downloads: Fitur unduh film premium offline 100% gratis sedang disiapkan! 📲");
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" x2="12" y1="15" y2="3"/>
        </svg>
        <span>Downloads</span>
      </button>

      <button 
        className={`bottom-nav-item ${currentTab === "more" ? "active" : ""}`}
        onClick={() => {
          if (setActiveTab) setActiveTab("more");
          if (onTriggerToast) onTriggerToast("🍔 More: Klik foto avatar profil di kanan atas untuk mengelola keanggotaan! 💎");
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
          <line x1="4" x2="20" y1="12" y2="12"/>
          <line x1="4" x2="20" y1="6" y2="6"/>
          <line x1="4" x2="20" y1="18" y2="18"/>
        </svg>
        <span>More</span>
      </button>

    </nav>
  );
}

export default BottomNav;