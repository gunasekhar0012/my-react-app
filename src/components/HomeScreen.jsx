import React, { useState } from "react";
import { Search, Star, Sparkles, Trophy, Flame, ChevronRight, Award, Film } from "lucide-react";

export default function HomeScreen({ heroes, onSelectHero, favorites, toggleFavorite, setActiveScreen }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const featuredHero = heroes[featuredIndex];

  const categories = ["All", "Pan-World Stars", "Mass Kings", "Style Icons", "Performance Masters"];

  // Filter and sort logic
  let filteredHeroes = heroes.filter((hero) => {
    const matchesSearch =
      hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hero.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hero.nickname.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || hero.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (sortBy === "totalMovies") {
    filteredHeroes = [...filteredHeroes].sort((a, b) => b.totalMovies - a.totalMovies);
  } else if (sortBy === "debutYear") {
    filteredHeroes = [...filteredHeroes].sort((a, b) => a.debutYear - b.debutYear);
  } else if (sortBy === "dance") {
    filteredHeroes = [...filteredHeroes].sort((a, b) => b.stats.massDance - a.stats.massDance);
  }

  return (
    <div className="home-screen">
      {/* Featured Banner */}
      <div className="hero-banner" style={{ borderColor: featuredHero.color }}>
        <div
          className="banner-glow"
          style={{
            background: `radial-gradient(circle, ${featuredHero.accentGlow} 0%, transparent 70%)`
          }}
        />

        <div className="banner-content">
          <div className="badge-tag" style={{ borderColor: featuredHero.color, color: featuredHero.color }}>
            <Sparkles size={14} /> Spotlight Super Hero • {featuredHero.tag}
          </div>
          <h1 className="banner-title">{featuredHero.name}</h1>
          <div style={{ color: featuredHero.color, fontWeight: "700", fontSize: "1.1rem", marginBottom: "0.75rem" }}>
            "{featuredHero.title}" • {featuredHero.nickname}
          </div>
          <p className="banner-desc">{featuredHero.bio}</p>

          <div className="banner-actions">
            <button
              className="btn-primary"
              style={{ background: `linear-gradient(135deg, ${featuredHero.color}, #f59e0b)` }}
              onClick={() => onSelectHero(featuredHero.id)}
            >
              Explore Full Spotlight <ChevronRight size={18} />
            </button>
            <button
              className="btn-secondary"
              onClick={() => setFeaturedIndex((prev) => (prev + 1) % heroes.length)}
            >
              Next Spotlight Star ↻
            </button>
          </div>
        </div>

        <div className="banner-featured-card">
          <div style={{ textTransform: "uppercase", fontSize: "0.75rem", color: "var(--text-secondary)", letterSpacing: "1px", marginBottom: "0.5rem" }}>
            Top Grossing Epic
          </div>
          <div style={{ fontSize: "1.2rem", fontWeight: "800", color: "#fff", marginBottom: "0.4rem" }}>
            {featuredHero.highestGrosser}
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", margin: "1rem 0" }}>
            {featuredHero.awards.slice(0, 3).map((award, i) => (
              <span key={i} style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem", background: "rgba(255,255,255,0.06)", borderRadius: "4px", color: "var(--text-gold)" }}>
                🏆 {award}
              </span>
            ))}
          </div>
          <div style={{ fontStyle: "italic", fontSize: "0.85rem", color: "#d1d5db", borderLeft: `3px solid ${featuredHero.color}`, paddingLeft: "0.75rem" }}>
            "{featuredHero.iconicDialogues[0].text}"
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-section">
        <div className="search-and-sort">
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Search Tollywood Superstars by name, title, or nickname..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: "600" }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "0.85rem 1rem",
                background: "rgba(18, 22, 32, 0.7)",
                border: "1px solid var(--glass-border)",
                borderRadius: "14px",
                color: "#fff",
                fontWeight: "600",
                outline: "none"
              }}
            >
              <option value="default">Featured Rank</option>
              <option value="totalMovies">Total Movies Count</option>
              <option value="debutYear">Debut Year (Earliest)</option>
              <option value="dance">Mass Dance Rating</option>
            </select>
          </div>
        </div>

        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`pill-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === "All" ? "🔥 All Superstars" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Heroes Card Grid */}
      <div className="heroes-grid">
        {filteredHeroes.map((hero) => {
          const isFav = favorites.includes(hero.id);
          return (
            <div
              key={hero.id}
              className="hero-card"
              style={{ "--card-glow": hero.accentGlow }}
            >
              <div>
                <div className="card-top-bar">
                  <span className="era-badge">{hero.era}</span>
                  <button
                    className={`fav-btn ${isFav ? "active" : ""}`}
                    onClick={() => toggleFavorite(hero.id)}
                    title="Bookmark Hero"
                  >
                    <Star size={20} fill={isFav ? "#ef4444" : "none"} />
                  </button>
                </div>

                <div className="hero-avatar-area" style={{ background: `linear-gradient(135deg, ${hero.color}22, rgba(15,18,28,0.9))` }}>
                  <div className="avatar-bg-gradient" />
                  <div className="avatar-initial-art">{hero.name.charAt(0)}</div>
                  <div className="avatar-info-overlay">
                    <div className="hero-name">{hero.name}</div>
                    <div className="hero-title-sub" style={{ color: hero.color }}>
                      "{hero.title}"
                    </div>
                  </div>
                </div>

                <p className="hero-bio-snippet">{hero.bio}</p>

                <div className="hero-stats-mini">
                  <div className="mini-stat-item">
                    <div className="stat-val" style={{ color: hero.color }}>{hero.totalMovies}</div>
                    <div className="stat-lbl">Movies</div>
                  </div>
                  <div className="mini-stat-item">
                    <div className="stat-val">{hero.industryHitsCount}</div>
                    <div className="stat-lbl">Industry Hits</div>
                  </div>
                  <div className="mini-stat-item">
                    <div className="stat-val">{hero.stats.boxOfficePull}%</div>
                    <div className="stat-lbl">BO Pull</div>
                  </div>
                </div>
              </div>

              <div className="card-actions">
                <button
                  className="btn-card-view"
                  style={{ borderColor: hero.color, color: hero.color }}
                  onClick={() => onSelectHero(hero.id)}
                >
                  <Sparkles size={16} /> View Profile & Filmography
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
