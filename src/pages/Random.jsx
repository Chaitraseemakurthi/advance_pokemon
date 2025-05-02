// src/pages/Random.jsx
import React, { useEffect, useState } from "react";

const Random = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomPokemon = async () => {
    setLoading(true);
    const randomId = Math.floor(Math.random() * 898) + 1; // 1 to 898 (Gen 1 to 8)
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await res.json();
      setPokemon(data);
    } catch (err) {
      console.error("Error fetching random Pokémon", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Random Pokémon</h2>
      <button onClick={fetchRandomPokemon}>Generate New</button>

      {loading && <p>Loading...</p>}

      {!loading && pokemon && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={pokemon.sprites?.front_default || "/fallback.png"}
            alt={pokemon.name}
          />
          <h3>{pokemon.name}</h3>
        </div>
      )}
    </div>
  );
};

export default Random;
