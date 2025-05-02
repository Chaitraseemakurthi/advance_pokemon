import React, { createContext, useState, useEffect } from "react";

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  const toggleFavorite = (pokemon) => {
    const isFav = favorites.some((fav) => fav.id === pokemon.id);
    const updated = isFav ? favorites.filter((f) => f.id !== pokemon.id) : [...favorites, pokemon];
    setFavorites(updated);
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <PokemonContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </PokemonContext.Provider>
  );
};