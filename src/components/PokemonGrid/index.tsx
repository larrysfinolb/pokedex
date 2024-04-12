import { PokemonCard } from '@/components/PokemonCard';
import { useEffect, useRef } from 'react';
import styles from './Pokemon.module.css';
import { SearchBar } from '../SearchBar';
import { useStore } from '@/hooks/useStore';
import { CardSkeleton } from '../CardSkeleton';
import { TypeFilter } from '../TypeFilter';

export function PokemonGrid() {
  const { state, fetchPokemons } = useStore();
  const prevSearch = useRef('');

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        fetchPokemons();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchPokemons]);

  useEffect(() => {
    if (state.search !== prevSearch.current) {
      prevSearch.current = state.search;
    }
  }, [state.search]);

  const renderCardSkeletons = (count: number) => {
    return Array.from({ length: count }).map((_, index) => <CardSkeleton key={index} />);
  };

  const isLoading = state.loading;
  const hasPokemons = state.pokemons.length > 0;
  const isSearching = state.search !== '';
  const wasSearching = prevSearch.current !== '';

  const shouldRenderSkeletons = isLoading && (!hasPokemons || isSearching || wasSearching);
  const shouldRenderExtraSkeletons = isLoading && hasPokemons && !isSearching;

  return (
    <>
      <div className={styles.Filters}>
        <SearchBar />
        <TypeFilter />
      </div>

      <section className={styles.Section}>
        {shouldRenderSkeletons
          ? renderCardSkeletons(9)
          : state.pokemons.map((pokemon) => <PokemonCard key={pokemon.id} data={pokemon} />)}

        {shouldRenderExtraSkeletons && renderCardSkeletons(3)}
      </section>
    </>
  );
}
