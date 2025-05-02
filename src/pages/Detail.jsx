import React from "react";
import { useParams } from "react-router-dom";
import usePokemon from "../hooks/usePokemon";

const Detail = () => {
  const { id } = useParams();
  const { data: pokemon, loading } = usePokemon(id);

  if (loading || !pokemon) return <p>Loading...</p>;

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>Stats</h3>
      <ul>
        {pokemon.stats.map((s) => (
          <li key={s.stat.name}>{s.stat.name}: {s.base_stat}</li>
        ))}
      </ul>
      <h3>Abilities</h3>
      <ul>
        {pokemon.abilities.map((a) => (
          <li key={a.ability.name}>{a.ability.name}</li>
        ))}
      </ul>
      <h3>Moves</h3>
      <ul>
        {pokemon.moves.slice(0, 10).map((m) => (
          <li key={m.move.name}>{m.move.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Detail;
