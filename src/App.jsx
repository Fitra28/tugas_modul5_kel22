import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import { List, Paper, Typography } from "@mui/material";
import AddUserDialog from "./components/AddUserDialog";
import axios from "axios";

const BASE_API_URL = "https://pokeapi.co/api/v2/pokemon";
const POKEMONS_PER_PAGE = 10;
const TOTAL_PAGES = 2;

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    async function getPokemon() {
      try {
        const res = await axios.get(
          `${BASE_API_URL}?limit=${POKEMONS_PER_PAGE}&offset=${(currentPage - 1) * POKEMONS_PER_PAGE}`
        );
        const responseData = res.data.results;
        setPokemonData(responseData);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
        window.alert("Error fetching Pokemon");
      }
    }
    getPokemon();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, TOTAL_PAGES));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const renderPokemonNames = () => {
    return pokemonData.map((pokemon, index) => (
      <div key={index} className="pokemon-name">{pokemon.name}</div>
    ));
  };

  return (
    <div className="App">
      <div className="page">
        <div className="list-container">
          <div className="list-title-wrapper">
            <Typography variant="h4">List Pokemon - KELOMPOK 22</Typography>
          </div>
          <Paper elevation={2} className="pokemon-list">
            <List>{renderPokemonNames()}</List>
          </Paper>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Halaman 1
            </button>
            <span>{`Page ${currentPage} of ${TOTAL_PAGES}`}</span>
            <button onClick={handleNextPage} disabled={currentPage === TOTAL_PAGES}>
              Halaman 2
            </button>
          </div>
        </div>
      </div>
      {isDialogOpen && (
        <AddUserDialog
          open={isDialogOpen}
          onClose={closeDialog}
          users={pokemonData}
          setUsers={setPokemonData}
        />
      )}
    </div>
  );
}

export default App;
