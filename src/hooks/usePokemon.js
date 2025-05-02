import { useEffect, useState } from "react";

const usePokemon = (urlOrId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const url = urlOrId.startsWith("http")
          ? urlOrId
          : `https://pokeapi.co/api/v2/pokemon/${urlOrId}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch Pokémon data");
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("Error fetching Pokémon:", e);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [urlOrId]);

  return { data, loading };
};

export default usePokemon;
