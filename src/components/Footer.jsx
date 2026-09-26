import React from "react";
import { Crown, Heart } from "lucide-react";

export default function Footer({ setActiveScreen }) {
  return (
    <footer className="app-footer">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <Crown size={20} color="var(--text-gold)" />
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: "800", color: "#fff", letterSpacing: "1px" }}>
          TFI SUPERSTARS HUB
        </span>
      </div>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
        Celebrating the Mass, Class, and Global Box Office Legends of Telugu Cinema.
      </p>
      <div style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
        Crafted with <Heart size={14} color="#ef4444" style={{ display: "inline", verticalAlign: "middle" }} /> for Tollywood Fans Worldwide
      </div>
    </footer>
  );
}
