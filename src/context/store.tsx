import { createContext, useEffect, useRef, useState } from 'react';
import type { IPokemon } from '@/types.d';
import { getPokemonsByName, getPokemonList } from '@/services/pokeapi/pokemon';
import { LIMIT_POKEMON_BY_FECTH, LIMIT_POKEMON_IN_API, OFFSET_TO_INCREMENT } from '@/constants';

interface IStore {
  state: {
    pokemons: IPokemon[];
    loading: boolean;
    search: string;
  };
  fetchPokemons: () => void;
  fetchPokemonsBySearch: (search: string) => void;
}

export const StoreContext = createContext<IStore | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [offset, setOffset] = useState(0);
  const fetchInProcess = useRef(false);
  const [state, setState] = useState<IStore['state']>({
    pokemons: [],
    loading: false,
    search: '',
  });

  const fetchPokemons = async () => {
    if (state.search !== '' || offset >= LIMIT_POKEMON_IN_API || fetchInProcess.current) return;

    fetchInProcess.current = true;
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const pokemons = await getPokemonList({ offset, limit: LIMIT_POKEMON_BY_FECTH });
      setOffset((prevOffset) => prevOffset + OFFSET_TO_INCREMENT);

      setState((prev) => ({ ...prev, pokemons: [...prev.pokemons, ...pokemons] }));
    } catch (error) {
      console.error('Error in fetch', error);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
      fetchInProcess.current = false;
    }
  };

  const fetchPokemonsBySearch = async (search: string) => {
    setState((prev) => ({ ...prev, search, loading: true }));

    try {
      if (search === '') {
        const pokemons = await getPokemonList({ offset: 0, limit: LIMIT_POKEMON_BY_FECTH });
        setOffset(OFFSET_TO_INCREMENT);
        setState((prev) => ({ ...prev, pokemons }));
      } else {
        const pokemons = await getPokemonsByName(search);
        setOffset(0);
        setState((prev) => ({ ...prev, pokemons }));
      }
    } catch (error) {
      console.error('Error in fetch by name', error);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const expose: IStore = {
    state,
    fetchPokemons,
    fetchPokemonsBySearch,
  };

  return <StoreContext.Provider value={expose}>{children}</StoreContext.Provider>;
};
