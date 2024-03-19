import React, { useState } from "react";
import { CircularProgress, Button, Select, MenuItem, Modal } from "@mui/material";
import PokemonModal from "./components/PokemonModal";
import PokemonTable from "./components/PokemonTable";
import { Pokemon } from "./api/pokemonApi";
import { usePokemonData } from "./hooks/usePokemonData";

const App: React.FC = () => {
  const {
    loading,
    pokemonData,
    offset,
    rowsPerPage,
    totalCount,
    handleRowsPerPageChange,
    nextPage,
    prevPage,
    goToPage,
    currentRangeStart,
    currentRangeEnd,
    totalPages,
    currentPage,
  } = usePokemonData();

  const [showPageNumbers, setShowPageNumbers] = useState<boolean>(false);

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  return (
    <div>
      <h1>Pokemon Data</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <div style={{ marginBottom: "10px" }}>
            Rows per page:
            <Select value={rowsPerPage} onChange={handleRowsPerPageChange} style={{ marginLeft: "10px", marginRight: "10px" }}>
              {[10, 25, 50, 100].map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
            ({currentRangeStart}–{currentRangeEnd} of {totalCount})
          </div>
          <PokemonTable pokemonData={pokemonData} handleOpenModal={handleOpenModal} />
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Button variant="contained" onClick={prevPage} disabled={offset === 0}>
              &lt; Previous
            </Button>
            {showPageNumbers && (
              <>
                {Array.from({ length: totalPages }, (_, index) => (
                  <Button
                    key={index}
                    variant={currentPage === index + 1 ? "contained" : "outlined"}
                    onClick={() => goToPage(index + 1)}
                    style={{ marginLeft: "5px" }}
                  >
                    {index + 1}
                  </Button>
                ))}
              </>
            )}
            <Button variant="contained" onClick={nextPage} style={{ marginLeft: "5px" }} disabled={offset + rowsPerPage >= totalCount}>
              Next &gt;
            </Button>
            <Button variant="contained" onClick={() => setShowPageNumbers(!showPageNumbers)} style={{ marginLeft: "10px" }}>
              {showPageNumbers ? "Hide Page Numbers" : "Show Page Numbers"}
            </Button>
          </div>
        </div>
      )}
      <Modal open={isModalOpen} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <PokemonModal selectedPokemon={selectedPokemon} handleCloseModal={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default App;
