import React, { useState } from "react";
import { Film, Award, MessageSquareQuote, Flame, Volume2, Sparkles, CheckCircle2, Trophy, Star } from "lucide-react";

export default function SpotlightScreen({ heroes, selectedHeroId, onSelectHero }) {
  const [activeTab, setActiveTab] = useState("films");
  const [playingDialogueIndex, setPlayingDialogueIndex] = useState(null);

  const hero = heroes.find((h) => h.id === selectedHeroId) || heroes[0];

  const handlePlayDialogue = (index) => {
    if (playingDialogueIndex === index) {
      setPlayingDialogueIndex(null);
    } else {
      setPlayingDialogueIndex(index);
    }
  };

  return (
    <div className="spotlight-screen">
      {/* Top Hero Quick Selector */}
      <div className="spotlight-hero-selector">
        {heroes.map((h) => (
          <button
            key={h.id}
            className={`spotlight-selector-btn ${h.id === hero.id ? "active" : ""}`}
            onClick={() => {
              onSelectHero(h.id);
              setPlayingDialogueIndex(null);
            }}
          >
            {h.name} ({h.title})
          </button>
        ))}
      </div>

      {/* Hero Header Banner */}
      <div
        className="spotlight-header"
        style={{
          borderColor: hero.color,
          boxShadow: `0 20px 50px -10px ${hero.accentGlow}`
        }}
      >
        <div className="hero-spotlight-profile">
          <div
            className="hero-big-avatar"
            style={{
              background: `linear-gradient(135deg, ${hero.color}33, #0b0c10)`,
              borderColor: hero.color
            }}
          >
            <div className="big-avatar-art">{hero.name.charAt(0)}</div>
            <div style={{ position: "absolute", bottom: "1.5rem", textAlign: "center" }}>
              <div style={{ fontStyle: "italic", fontSize: "0.9rem", color: hero.color }}>"{hero.nickname}"</div>
              <span className="era-badge" style={{ marginTop: "0.4rem", display: "inline-block" }}>
                {hero.era}
              </span>
            </div>
          </div>

          <div className="spotlight-info-col">
            <span className="badge-tag" style={{ borderColor: hero.color, color: hero.color }}>
              <Trophy size={14} /> {hero.category} • {hero.tag}
            </span>
            <h1 style={{ color: "#ffffff" }}>{hero.name}</h1>
            <div className="spotlight-subtitle" style={{ color: hero.color }}>
              "{hero.title}"
            </div>
            <p className="spotlight-bio">{hero.bio}</p>

            <div className="spotlight-stats-grid">
              <div className="stat-box-card">
                <div className="stat-box-num" style={{ color: hero.color }}>{hero.totalMovies}</div>
                <div className="stat-box-label">Career Movies</div>
              </div>
              <div className="stat-box-card">
                <div className="stat-box-num" style={{ color: hero.color }}>{hero.industryHitsCount}</div>
                <div className="stat-box-label">Industry Hits</div>
              </div>
              <div className="stat-box-card">
                <div className="stat-box-num" style={{ color: hero.color }}>{hero.debutYear}</div>
                <div className="stat-box-label">Debut Year</div>
              </div>
              <div className="stat-box-card">
                <div className="stat-box-num" style={{ color: hero.color }}>{hero.stats.boxOfficePull}%</div>
                <div className="stat-box-label">Box Office Index</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="spotlight-tabs">
        <button
          className={`tab-btn ${activeTab === "films" ? "active" : ""}`}
          onClick={() => setActiveTab("films")}
        >
          <Film size={18} /> Major Filmography & Verdicts
        </button>
        <button
          className={`tab-btn ${activeTab === "dialogues" ? "active" : ""}`}
          onClick={() => setActiveTab("dialogues")}
        >
          <MessageSquareQuote size={18} /> Iconic Punch Dialogues
        </button>
        <button
          className={`tab-btn ${activeTab === "awards" ? "active" : ""}`}
          onClick={() => setActiveTab("awards")}
        >
          <Award size={18} /> Prestigious Awards & Accolades
        </button>
        <button
          className={`tab-btn ${activeTab === "style" ? "active" : ""}`}
          onClick={() => setActiveTab("style")}
        >
          <Flame size={18} /> Signature Moves & Swag
        </button>
      </div>

      {/* Tab 1: Filmography Grid */}
      {activeTab === "films" && (
        <div className="filmography-grid">
          {hero.filmography.map((film, index) => (
            <div key={index} className="film-card">
              <div className="film-badge">{film.verdict}</div>
              <div className="film-title">{film.title} ({film.year})</div>
              <div className="film-role">Role: {film.role}</div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "0.75rem" }}>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>BOX OFFICE</div>
                  <div style={{ fontSize: "0.95rem", fontWeight: "800", color: "#fff" }}>{film.gross}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>AUDIENCE RATING</div>
                  <div style={{ fontSize: "0.95rem", fontWeight: "800", color: "var(--text-gold)" }}>⭐ {film.rating}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Dialogue Quotes */}
      {activeTab === "dialogues" && (
        <div>
          {hero.iconicDialogues.map((dlg, idx) => {
            const isPlaying = playingDialogueIndex === idx;
            return (
              <div key={idx} className="dialogue-card" style={{ borderColor: hero.color }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                  <div className="dialogue-text">"{dlg.text}"</div>
                  <button
                    onClick={() => handlePlayDialogue(idx)}
                    style={{
                      padding: "0.6rem 1rem",
                      borderRadius: "30px",
                      background: isPlaying ? hero.color : "rgba(255,255,255,0.06)",
                      color: isPlaying ? "#000" : "#fff",
                      border: "none",
                      fontWeight: "700",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      whiteSpace: "nowrap"
                    }}
                  >
                    <Volume2 size={16} /> {isPlaying ? "Stop Audio" : "Listen Punch"}
                  </button>
                </div>

                <div className="dialogue-movie">— {dlg.movie}</div>

                {isPlaying && (
                  <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "4px", height: "20px" }}>
                    {[...Array(16)].map((_, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: `${Math.sin(i + Date.now() / 200) * 80 + 20}%`,
                          background: hero.color,
                          borderRadius: "2px",
                          animation: "pulseGlow 0.5s infinite alternate",
                          animationDelay: `${i * 0.05}s`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 3: Awards & Accolades */}
      {activeTab === "awards" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
          {hero.awards.map((award, idx) => (
            <div
              key={idx}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-gold)",
                borderRadius: "14px",
                padding: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem"
              }}
            >
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255, 215, 0, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-gold)" }}>
                <Trophy size={20} />
              </div>
              <div style={{ fontWeight: "700", fontSize: "1rem", color: "#fff" }}>{award}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Signature Moves & Swag */}
      {activeTab === "style" && (
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--glass-border)", borderRadius: "20px", padding: "2rem" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", color: hero.color, marginBottom: "1.5rem" }}>
            Iconic Trademark Signature Moves
          </h3>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
            {hero.signatureMoves.map((move, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${hero.color}`,
                  padding: "0.75rem 1.25rem",
                  borderRadius: "12px",
                  fontWeight: "700",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <Sparkles size={16} color={hero.color} /> {move}
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(0,0,0,0.3)", padding: "1.5rem", borderRadius: "14px", borderLeft: `4px solid ${hero.color}` }}>
            <h4 style={{ color: "var(--text-gold)", marginBottom: "0.5rem" }}>Superstar Personal Philosophy</h4>
            <p style={{ fontStyle: "italic", color: "var(--text-secondary)" }}>"{hero.quote}"</p>
          </div>
        </div>
      )}
    </div>
  );
}
