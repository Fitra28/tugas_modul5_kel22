import React, { useEffect, useContext } from "react";
import axios from "axios";
import "./App.css"; // Import file CSS
const PokemonListContext = React.createContext();
export function usePokemonList() {
  return useContext(PokemonListContext);
}
export function PokemonListProvider({ children, offset }) {
  const [pokemonList, setPokemonList] = React.useState([]);
  useEffect(() => {
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon/?limit=10&offs
et=${offset}`
      )
      .then((response) => {
        const data = response.data.results.map((pokemon) => ({
          name: pokemon.name,
        }));
        setPokemonList(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [offset]);
  return (
    <PokemonListContext.Provider value={pokemonList}>
      {children}
    </PokemonListContext.Provider>
  );
}
export default function PokemonList() {
  const pokemonList = usePokemonList();
  return (
    <div className="pokemon-list">
      {pokemonList.map((pokemon, index) => (
        <div key={index} className="pokemon-card">
          <p className="pokemon-name">{pokemon.name}</p>
        </div>
      ))}
    </div>
  );
}
