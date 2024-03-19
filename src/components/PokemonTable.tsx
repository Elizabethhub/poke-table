import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Pokemon } from "../api/pokemonApi";

interface PokemonTableProps {
  pokemonData: Pokemon[];
  handleOpenModal: (pokemon: Pokemon) => void;
}

const PokemonTable: React.FC<PokemonTableProps> = ({ pokemonData, handleOpenModal }) => {
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const sortData = (key: string) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const sortedData = [...pokemonData].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortBy === "height" || sortBy === "weight" || sortBy === "base_experience") {
      return sortOrder === "asc" ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
    } else if (sortBy === "moves") {
      return sortOrder === "asc" ? a.moves.length - b.moves.length : b.moves.length - a.moves.length;
    }
    return 0;
  });

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const isSortedBy = (key: string) => sortBy === key;

  const arrow = (key: string) => {
    if (isSortedBy(key)) {
      return sortOrder === "asc" ? "▲" : "▼";
    }
    return "";
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell onClick={() => sortData("name")} sx={{ cursor: "pointer" }} title="Click to sort by name">
              Name {arrow("name")}
            </TableCell>
            <TableCell onClick={() => sortData("height")} sx={{ cursor: "pointer" }} title="Click to sort by height">
              Height {arrow("height")}
            </TableCell>
            <TableCell onClick={() => sortData("weight")} sx={{ cursor: "pointer" }} title="Click to sort by weight">
              Weight {arrow("weight")}
            </TableCell>
            <TableCell onClick={() => sortData("base_experience")} sx={{ cursor: "pointer" }} title="Click to sort by base experience">
              Base Experience {arrow("base_experience")}
            </TableCell>
            <TableCell>Abilities</TableCell>
            <TableCell>Types</TableCell>
            <TableCell onClick={() => sortData("moves")} sx={{ cursor: "pointer" }} title="Click to sort by moves number">
              Number of Moves {arrow("moves")}
            </TableCell>
            <TableCell>Base Stats</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((pokemon, index) => (
            <TableRow key={index} onClick={() => handleOpenModal(pokemon)} style={{ cursor: "pointer" }}>
              <TableCell>{capitalizeFirstLetter(pokemon.name)}</TableCell>
              <TableCell>{pokemon.height}</TableCell>
              <TableCell>{pokemon.weight}</TableCell>
              <TableCell>{pokemon.base_experience}</TableCell>
              <TableCell>
                {pokemon.abilities.map((abilityObj, index) => (
                  <span key={index}>
                    {abilityObj.ability.name}
                    {index < pokemon.abilities.length - 1 && ", "}
                  </span>
                ))}
              </TableCell>
              <TableCell>
                {pokemon.types.map((typeObj, index) => (
                  <span key={index}>
                    {typeObj.type.name}
                    {index < pokemon.types.length - 1 && ", "}
                  </span>
                ))}
              </TableCell>
              <TableCell>{pokemon.moves.length}</TableCell>
              <TableCell>
                {pokemon.stats.map((stat, index) => (
                  <span key={index}>
                    {stat.stat.name}: {stat.base_stat}
                    {index < pokemon.stats.length - 1 && ", "}
                  </span>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PokemonTable;
