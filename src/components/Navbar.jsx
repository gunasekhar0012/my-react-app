import React from "react";
import { Crown, Flame, Swords, Sparkles, Star } from "lucide-react";

export default function Navbar({ activeScreen, setActiveScreen, favCount }) {
  const navItems = [
    { id: "home", label: "Hall of Legends", icon: Crown },
    { id: "spotlight", label: "Hero Spotlight", icon: Sparkles },
    { id: "showdown", label: "Showdown Arena", icon: Swords },
    { id: "fanzone", label: "Fan Arena & Quiz", icon: Flame },
  ];

  return (
    <header className="app-navbar">
      <div className="brand-container" onClick={() => setActiveScreen("home")}>
        <div className="brand-logo-icon">
          <Crown size={24} />
        </div>
        <div>
          <div className="brand-title">TFI SUPERSTARS</div>
          <div className="brand-subtitle">Tollywood Heroes Hub</div>
        </div>
      </div>

      <nav className="nav-links">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={() => setActiveScreen(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {favCount > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#ffd700", fontWeight: "700", fontSize: "0.9rem" }}>
          <Star size={18} fill="#ffd700" />
          <span>{favCount} Saved</span>
        </div>
      )}
    </header>
  );
}
