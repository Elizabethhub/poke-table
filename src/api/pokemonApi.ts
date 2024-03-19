import axios from "axios";

export interface Pokemon {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  types: { slot: number; type: { name: string; url: string } }[];
  moves: { name: string; url: string }[];
  stats: { base_stat: number; effort: number; stat: { name: string; url: string } }[];
  cries: {
    latest: string;
    legacy: string;
  };
  forms: { name: string; url: string }[];
  game_indices: { game_index: number; version: { name: string; url: string } }[];
  sprites?:
    | {
        back_default: string;
        back_shiny: string;
        front_default: string;
        front_shiny: string;
      }
    | undefined;
}

export interface PokemonResult {
  url: string;
  name: string;
}

export async function fetchPokemonTotalCount(): Promise<number> {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    return response.data.count;
  } catch (error) {
    console.error("Error fetching total count:", error);
    return 0;
  }
}

export async function fetchPokemonData(offset: number, limit: number): Promise<Pokemon[]> {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const results: PokemonResult[] = response.data.results;

    const data: Pokemon[] = await Promise.all(
      results.map(async (pokemon: PokemonResult) => {
        const { data: pokemonDetails } = await axios.get(pokemon.url);
        return {
          name: pokemon.name,
          height: pokemonDetails.height,
          weight: pokemonDetails.weight,
          base_experience: pokemonDetails.base_experience,
          abilities: pokemonDetails.abilities,
          types: pokemonDetails.types,
          moves: pokemonDetails.moves,
          stats: pokemonDetails.stats,
          cries: pokemonDetails.cries,
          forms: pokemonDetails.forms,
          game_indices: pokemonDetails.game_indices,
          sprites: pokemonDetails.sprites,
        };
      })
    );
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
