import React, { useContext } from "react";
import usePokemon from "../hooks/usePokemon";
import { Link } from "react-router-dom";
import { PokemonContext } from "../Contexts/PokemonContext";

const PokemonCard = ({ url }) => {
  const { data: pokemon, loading } = usePokemon(url);
  const { favorites, toggleFavorite } = useContext(PokemonContext);

  if (loading || !pokemon) return <p>Loading...</p>;

  const isFavorite = favorites.some((fav) => fav.id === pokemon.id);

  return (
    <div style={{
      position: "relative",
      border: "1px solid #ccc",
      padding: "10px", 
      width: "150px",
      textAlign: "center",
      borderRadius: "8px",
      backgroundColor: "#fff",
    }}>
      {/* Heart icon in top-right corner */}
      <button
        onClick={() => toggleFavorite(pokemon)}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          background: "none",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
          color: isFavorite ? "red" : "gray"
        }}
        aria-label="Toggle Favorite"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3 style={{ textTransform: "capitalize" }}>{pokemon.name}</h3>
      <Link to={`/pokemon/${pokemon.id}`}>View Details</Link>
    </div>
  );
};

export default PokemonCard;
