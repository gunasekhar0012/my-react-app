import React, { useState } from "react";
import { Swords, Trophy, Flame, Star, Sparkles, Shield, Zap } from "lucide-react";

export default function ShowdownScreen({ heroes }) {
  const [hero1Id, setHero1Id] = useState(heroes[0].id);
  const [hero2Id, setHero2Id] = useState(heroes[1].id);

  const hero1 = heroes.find((h) => h.id === hero1Id) || heroes[0];
  const hero2 = heroes.find((h) => h.id === hero2Id) || heroes[1];

  const statMetrics = [
    { key: "boxOfficePull", label: "Box Office Pull", icon: Trophy },
    { key: "massDance", label: "Mass Dance Power", icon: Zap },
    { key: "actionPower", label: "Action Intensity", icon: Flame },
    { key: "dialoguePunch", label: "Dialogue Punch", icon: Sparkles },
    { key: "fanBase", label: "Cult Fandom", icon: Star },
    { key: "versatility", label: "Acting Versatility", icon: Shield }
  ];

  // Calculate winner score based on sum of stats
  const hero1Score = Object.values(hero1.stats).reduce((a, b) => a + b, 0);
  const hero2Score = Object.values(hero2.stats).reduce((a, b) => a + b, 0);

  return (
    <div className="showdown-screen">
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div className="badge-tag" style={{ margin: "0 auto 0.75rem auto" }}>
          <Swords size={14} /> Head-to-Head Tollywood Battle Arena
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", color: "#fff" }}>
          BOX OFFICE & STATS SHOWDOWN
        </h1>
        <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0.5rem auto 0 auto" }}>
          Compare the legends of TFI side-by-side on dance, box office clout, cult fandom, action intensity, and filmography milestones!
        </p>
      </div>

      {/* Selectors */}
      <div className="showdown-selectors">
        <div className="select-hero-box" style={{ borderColor: hero1.color }}>
          <div className="select-label" style={{ color: hero1.color }}>Hero 1 (Red Corner)</div>
          <select
            className="custom-select"
            value={hero1Id}
            onChange={(e) => setHero1Id(e.target.value)}
          >
            {heroes.map((h) => (
              <option key={h.id} value={h.id} disabled={h.id === hero2Id}>
                {h.name} ({h.title})
              </option>
            ))}
          </select>

          <div style={{ marginTop: "1.25rem", textAlign: "center" }}>
            <div style={{ fontSize: "1.8rem", fontFamily: "var(--font-heading)", fontWeight: "900", color: hero1.color }}>
              {hero1.name}
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>"{hero1.title}"</div>
          </div>
        </div>

        <div className="select-hero-box" style={{ borderColor: hero2.color }}>
          <div className="select-label" style={{ color: hero2.color }}>Hero 2 (Blue Corner)</div>
          <select
            className="custom-select"
            value={hero2Id}
            onChange={(e) => setHero2Id(e.target.value)}
          >
            {heroes.map((h) => (
              <option key={h.id} value={h.id} disabled={h.id === hero1Id}>
                {h.name} ({h.title})
              </option>
            ))}
          </select>

          <div style={{ marginTop: "1.25rem", textAlign: "center" }}>
            <div style={{ fontSize: "1.8rem", fontFamily: "var(--font-heading)", fontWeight: "900", color: hero2.color }}>
              {hero2.name}
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>"{hero2.title}"</div>
          </div>
        </div>
      </div>

      {/* Winner Summary Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(20,25,35,0.9), rgba(10,12,18,0.9))",
          border: "1px solid var(--border-gold)",
          borderRadius: "20px",
          padding: "1.5rem",
          textAlign: "center",
          marginBottom: "2.5rem"
        }}
      >
        <div style={{ fontSize: "0.8rem", color: "var(--text-gold)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700" }}>
          Arena Overall Battle Analysis
        </div>
        <div style={{ fontSize: "1.3rem", fontWeight: "800", color: "#fff", marginTop: "0.3rem" }}>
          {hero1Score > hero2Score ? (
            <span><span style={{ color: hero1.color }}>{hero1.name}</span> leads overall stats with {hero1Score} pts!</span>
          ) : hero2Score > hero1Score ? (
            <span><span style={{ color: hero2.color }}>{hero2.name}</span> leads overall stats with {hero2Score} pts!</span>
          ) : (
            <span>Both legends are tied with equal super-power rating of {hero1Score} pts!</span>
          )}
        </div>
      </div>

      {/* Comparative Stat Bars */}
      <div className="comparison-table">
        <h3 style={{ fontFamily: "var(--font-heading)", textAlign: "center", marginBottom: "2rem", color: "var(--text-gold)" }}>
          SKILL & INFLUENCE COMPARISON
        </h3>

        {statMetrics.map((metric) => {
          const val1 = hero1.stats[metric.key];
          const val2 = hero2.stats[metric.key];
          const Icon = metric.icon;

          return (
            <div key={metric.key} className="stat-comparison-row">
              <div className="stat-name-hdr">
                <Icon size={14} style={{ display: "inline", marginRight: "6px" }} />
                {metric.label}
              </div>

              <div className="bars-wrapper">
                <div className="progress-bar-container left-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${val1}%`,
                      background: `linear-gradient(90deg, ${hero1.color}aa, ${hero1.color})`
                    }}
                  />
                </div>

                <div className="score-num">
                  <span style={{ color: hero1.color }}>{val1}</span> vs <span style={{ color: hero2.color }}>{val2}</span>
                </div>

                <div className="progress-bar-container right-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${val2}%`,
                      background: `linear-gradient(90deg, ${hero2.color}, ${hero2.color}aa)`
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Head-to-Head Milestones Table */}
      <div style={{ marginTop: "2.5rem", background: "var(--bg-card)", border: "1px solid var(--glass-border)", borderRadius: "20px", padding: "2rem" }}>
        <h3 style={{ fontFamily: "var(--font-heading)", color: "#fff", marginBottom: "1.5rem", textAlign: "center" }}>
          MILESTONES & RECORDS HEAD-TO-HEAD
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr", gap: "1rem", textAlign: "center", fontWeight: "700" }}>
          <div style={{ color: hero1.color, fontSize: "1.1rem" }}>{hero1.name}</div>
          <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Category</div>
          <div style={{ color: hero2.color, fontSize: "1.1rem" }}>{hero2.name}</div>

          <div style={{ color: "#fff" }}>{hero1.debutYear}</div>
          <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Debut Year</div>
          <div style={{ color: "#fff" }}>{hero2.debutYear}</div>

          <div style={{ color: "#fff" }}>{hero1.totalMovies}</div>
          <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Total Movies</div>
          <div style={{ color: "#fff" }}>{hero2.totalMovies}</div>

          <div style={{ color: "#fff" }}>{hero1.industryHitsCount}</div>
          <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Industry Hits</div>
          <div style={{ color: "#fff" }}>{hero2.industryHitsCount}</div>

          <div style={{ color: "var(--text-gold)" }}>{hero1.highestGrosser}</div>
          <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Highest Grosser</div>
          <div style={{ color: "var(--text-gold)" }}>{hero2.highestGrosser}</div>
        </div>
      </div>
    </div>
  );
}
