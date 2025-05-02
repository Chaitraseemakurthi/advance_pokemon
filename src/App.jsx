import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Favorites from "./pages/Favorites";
import Compare from "./pages/Compare";
import Random from "./pages/Random";
import ErrorBoundary from "./Components/ErrorBoundary";


const App = () => (
  <ErrorBoundary>
    <header>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="brand">Pokémon Explorer</Link>
        </div>
        <div className="nav-right">
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/compare">Compare</Link>
          <Link to="/random">Random</Link>
        </div>
      </nav>
    </header>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon/:id" element={<Detail />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="/random" element={<Random />} />
    </Routes>
  </ErrorBoundary>
);

export default App;
