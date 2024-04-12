import type { IPokemon } from '@/types.d';
import { useEffect, useState } from 'react';
import { getPokemonList } from '@/services/pokeapi/pokemon';

const OFFSET = 21;
const LIMIT = 21;

export function usePokemonList() {
  const [data, setData] = useState<IPokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  const fetchData = async () => {
    if (offset >= 1302 || isLoading) return;

    setIsLoading(true);

    try {
      const pokemons = await getPokemonList({ offset, limit: LIMIT });
      setOffset((prevOffset) => prevOffset + OFFSET);
      setData((prevData) => [...prevData, ...pokemons]);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, fetchData };
}
