import React, { useState } from "react";
import usePokemon from "../hooks/usePokemon";

const Compare = () => {
  const [id1, setId1] = useState(0);
  const [id2, setId2] = useState(0);
  const { data: p1 } = usePokemon(id1);
  const { data: p2 } = usePokemon(id2);

  return (
    <div>
      <h2>Compare Pokémon</h2>
      <input type="number" value={id1} onChange={(e) => setId1(e.target.value)} />
      <input type="number" value={id2} onChange={(e) => setId2(e.target.value)} />
      <div className="compare-grid">
        {p1 && <div>
          <h3>{p1.name}</h3>
          {p1.stats.map((s) => <p key={s.stat.name}>{s.stat.name}: {s.base_stat}</p>)}
        </div>}
        {p2 && <div>
          <h3>{p2.name}</h3>
          {p2.stats.map((s) => <p key={s.stat.name}>{s.stat.name}: {s.base_stat}</p>)}
        </div>}
      </div>
    </div>
  );
};

export default Compare;