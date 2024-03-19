import { useState, useEffect } from "react";
import { Pokemon, fetchPokemonData, fetchPokemonTotalCount } from "../api/pokemonApi";
import { SelectChangeEvent } from "@mui/material";
export const usePokemonData = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchPokemonData(offset, rowsPerPage);
      setPokemonData(data);
      setLoading(false);
    };
    fetchData();
  }, [offset, rowsPerPage]);

  useEffect(() => {
    const fetchTotalCount = async () => {
      const count = await fetchPokemonTotalCount();
      setTotalCount(count);
    };

    fetchTotalCount();
  }, []);

  const handleRowsPerPageChange = (event: SelectChangeEvent<string | number>) => {
    const value = parseInt(event.target.value as string, 10);
    setRowsPerPage(value);
    setOffset(0);
  };

  const nextPage = () => {
    if (offset + rowsPerPage < totalCount) {
      setOffset(offset + rowsPerPage);
    }
  };

  const prevPage = () => {
    if (offset >= rowsPerPage) {
      setOffset(offset - rowsPerPage);
    }
  };

  const currentRangeStart = offset + 1;
  const currentRangeEnd = Math.min(offset + rowsPerPage, totalCount);
  const totalPages = Math.ceil(totalCount / rowsPerPage);
  const currentPage = Math.floor(offset / rowsPerPage) + 1;

  const goToPage = (page: number) => {
    setOffset((page - 1) * rowsPerPage);
  };

  return {
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
  };
};
