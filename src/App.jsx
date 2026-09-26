import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomeScreen from "./components/HomeScreen";
import SpotlightScreen from "./components/SpotlightScreen";
import ShowdownScreen from "./components/ShowdownScreen";
import FanZoneScreen from "./components/FanZoneScreen";
import Footer from "./components/Footer";
import { heroesData } from "./data/heroes";

export default function App() {
  const [activeScreen, setActiveScreen] = useState("home");
  const [selectedHeroId, setSelectedHeroId] = useState("chiranjeevi");
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("tfi_hero_favorites");
      return saved ? JSON.parse(saved) : ["chiranjeevi", "prabhas"];
    } catch (e) {
      return ["chiranjeevi", "prabhas"];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("tfi_hero_favorites", JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  const toggleFavorite = (heroId) => {
    if (favorites.includes(heroId)) {
      setFavorites(favorites.filter((id) => id !== heroId));
    } else {
      setFavorites([...favorites, heroId]);
    }
  };

  const handleSelectHero = (heroId) => {
    setSelectedHeroId(heroId);
    setActiveScreen("spotlight");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-root">
      <Navbar
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        favCount={favorites.length}
      />

      <main className="page-container">
        {activeScreen === "home" && (
          <HomeScreen
            heroes={heroesData}
            onSelectHero={handleSelectHero}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            setActiveScreen={setActiveScreen}
          />
        )}

        {activeScreen === "spotlight" && (
          <SpotlightScreen
            heroes={heroesData}
            selectedHeroId={selectedHeroId}
            onSelectHero={setSelectedHeroId}
          />
        )}

        {activeScreen === "showdown" && (
          <ShowdownScreen heroes={heroesData} />
        )}

        {activeScreen === "fanzone" && (
          <FanZoneScreen heroes={heroesData} onSelectHero={handleSelectHero} />
        )}
      </main>

      <Footer setActiveScreen={setActiveScreen} />
    </div>
  );
}
