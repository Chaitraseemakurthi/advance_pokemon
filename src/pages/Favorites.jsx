import React, { useContext } from "react";
import { PokemonContext } from "../Contexts/PokemonContext";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites } = useContext(PokemonContext);

  return (
    <div>
      <h2><center>Favorites</center></h2>
      {favorites.length === 0 ? (
        <p><center>No favorites yet.</center></p>
      ) : (
        <div className="grid">
          {favorites.map((p) => (
            <div key={p.id} className="card">
              <img src={p.sprites.front_default} alt={p.name} />
              <h3>{p.name}</h3>
              <Link to={`/pokemon/${p.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;