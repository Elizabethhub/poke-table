import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import { Pokemon } from "../api/pokemonApi";

interface PokemonModalProps {
  selectedPokemon: Pokemon | null;
  handleCloseModal: () => void;
}

const PokemonModal: React.FC<PokemonModalProps> = ({ selectedPokemon, handleCloseModal }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(delay);
  }, []);

  const renderSprite = (spriteUrl: string | undefined, altText: string) => {
    return selectedPokemon?.sprites?.front_default ? <img src={spriteUrl} alt={altText} style={{ marginRight: "10px" }} /> : null;
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        bgcolor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "4px",
        boxShadow: 24,
        p: 4,
      }}
    >
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99,
            bgcolor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {selectedPokemon?.name.toUpperCase()}
      </Typography>
      <IconButton
        aria-label="close"
        onClick={handleCloseModal}
        sx={{
          position: "absolute",
          top: 3,
          right: 3,
        }}
      >
        X
      </IconButton>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <ul>
          <li>
            <strong>Cries Latest:</strong> {selectedPokemon?.cries.latest}
          </li>
          <li>
            <strong>Cries Legacy:</strong> {selectedPokemon?.cries.legacy}
          </li>
          <li>
            <strong>Forms:</strong> {selectedPokemon?.forms.map((form) => form.name).join(", ")}
          </li>
          <li>
            <strong>Game Indices:</strong>{" "}
            {selectedPokemon?.game_indices.map((index) => `${index.version.name} (${index.game_index})`).join(", ")}
          </li>
        </ul>
        <Box display="flex" justifyContent="center" marginTop="20px">
          {renderSprite(selectedPokemon?.sprites?.front_default, "Front Sprite")}
          {renderSprite(selectedPokemon?.sprites?.back_default, "Back Sprite")}
          {renderSprite(selectedPokemon?.sprites?.front_shiny, "Shiny Front Sprite")}
          {renderSprite(selectedPokemon?.sprites?.back_shiny, "Shiny Back Sprite")}
        </Box>
      </Typography>
    </Box>
  );
};

export default PokemonModal;
