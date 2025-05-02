import React, { useState, useEffect } from "react";
import PokemonCard from "../Components/PokemonCard";

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [sortOption, setSortOption] = useState("id");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [allTypes, setAllTypes] = useState([]);

  // Fetch available types for filtering
  useEffect(() => {
    const fetchTypes = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/type");
      const json = await res.json();
      setAllTypes(json.results);
    };
    fetchTypes();
  }, []);

  // Fetch Pokémon list and filter by selected types
  useEffect(() => {
    const fetchList = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const json = await res.json();
      setPokemonList(json.results);
      setTotal(json.count);
    };
    fetchList();
  }, [limit, offset]);

  // Filter Pokémon based on selected types
  useEffect(() => {
    const fetchFilteredPokemon = async () => {
      const filteredResults = [];
      for (const p of pokemonList) {
        const res = await fetch(p.url);
        const json = await res.json();
        const types = json.types.map((type) => type.type.name);
        if (selectedTypes.every((type) => types.includes(type))) {
          filteredResults.push(p);
        }
      }
      setFilteredPokemon(filteredResults);
    };
    if (selectedTypes.length > 0) {
      fetchFilteredPokemon();
    } else {
      setFilteredPokemon(pokemonList); // Show all Pokémon if no filter is applied
    }
  }, [selectedTypes, pokemonList]);

  const handlePrev = () => {
    setOffset((prev) => {
      const newOffset = Math.max(prev - limit, 0);
      scrollToTop();
      return newOffset;
    });
  };

  const handleNext = () => {
    setOffset((prev) => {
      const newOffset = prev + limit < total ? prev + limit : prev;
      scrollToTop();
      return newOffset;
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const currentPage = Math.floor(offset / limit);
  const totalPages = Math.ceil(total / limit);

  const handleTypeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedTypes((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((type) => type !== value);
      }
    });
  };

  return (
    <div style={{ display: "flex", marginTop: "2rem" }}>
      {/* Pokemon Cards Section */}
      <div style={{ flex: 1 }}>
        <label>
          Items per page:{" "}
          <select onChange={(e) => setLimit(Number(e.target.value))} value={limit}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </label>

        <div className="grid">
          {(selectedTypes.length > 0 ? filteredPokemon : pokemonList).map((p) => (
            <PokemonCard key={p.name} url={p.url} />
          ))}
        </div>

        <div className="pagination-arrows">
          <button onClick={handlePrev} disabled={offset === 0}>
            ← Previous
          </button>

          <button onClick={handleNext} disabled={offset + limit >= total}>
            Next →
          </button>
        </div>
      </div>

      {/* Sidebar for Sorting and Filtering */}
      <div style={{ marginLeft: "20px", minWidth: "250px", borderLeft: "1px solid #ccc", paddingLeft: "20px" }}>
        <h3>Sort Pokémon</h3>
        <div>
          <label>
            Sort by:{" "}
            <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
              <option value="id">ID</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
            </select>
          </label>
        </div>

        <h3>Filter by Types</h3>
        <div>
          {allTypes.map((type) => (
            <div key={type.name}>
              <label>
                <input
                  type="checkbox"
                  value={type.name}
                  onChange={handleTypeChange}
                  checked={selectedTypes.includes(type.name)}
                />
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
