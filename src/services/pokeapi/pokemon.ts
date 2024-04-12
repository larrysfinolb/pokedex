import type { TPokemonType, IPokemon } from '@/types.d';

export const getPokemonList = async (
  { limit, offset }: { limit?: number; offset?: number } = { limit: 20, offset: 0 }
) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const data = await response.json();

  const pokemons: IPokemon[] = await Promise.all(
    data.results.map((pokemon: { url: string }) => getPokemon(pokemon.url))
  );

  return pokemons;
};

export const getPokemonsByName = async (name: string) => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
  const { results: data } = await response.json();

  const pokemons: IPokemon[] = await Promise.all(
    data
      .filter((pokemon: { name: string }) => pokemon.name.includes(name.toLocaleLowerCase()))
      .map((pokemon: { url: string }) => getPokemon(pokemon.url))
  );

  return pokemons;
};

export const getPokemonByType = async (type: TPokemonType) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
  const { results: data } = await response.json();

  const pokemons: IPokemon[] = await Promise.all(data.map((pokemon: { url: string }) => getPokemon(pokemon.url)));
  const filteredPokemons = pokemons.filter((pokemon) => pokemon.types.includes(type));

  return filteredPokemons;
};

const getPokemon = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    types: data.types.map((type: { type: { name: string } }) => type.type.name),
    height: data.height,
    weight: data.weight,
    sprite: data.sprites.other['official-artwork'].front_default,
  } as IPokemon;
};
