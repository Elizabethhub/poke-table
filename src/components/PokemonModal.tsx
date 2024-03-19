import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import { Pokemon } from "../api/pokemonApi";
import styles from "./PokemonModal.module.css";

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
    return selectedPokemon?.sprites?.front_default ? <img src={spriteUrl} alt={altText} className={styles.spriteImage} /> : null;
  };

  return (
    <Box className={styles.modalContainer}>
      {isLoading && (
        <Box className={styles.overlay}>
          <CircularProgress />
        </Box>
      )}
      <Box className={styles.modalContentWrapper}>
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
          <Box className={styles.spriteContainer}>
            {renderSprite(selectedPokemon?.sprites?.front_default, "Front Sprite")}
            {renderSprite(selectedPokemon?.sprites?.back_default, "Back Sprite")}
            {renderSprite(selectedPokemon?.sprites?.front_shiny, "Shiny Front Sprite")}
            {renderSprite(selectedPokemon?.sprites?.back_shiny, "Shiny Back Sprite")}
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default PokemonModal;
