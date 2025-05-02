import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PokemonProvider } from "./Contexts/PokemonContext";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <PokemonProvider>
        <App />
      </PokemonProvider>
    </BrowserRouter>
);