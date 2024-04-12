import { IconSearch } from '@tabler/icons-react';
import styles from './SearchBar.module.css';
import { useStore } from '@/hooks/useStore';

export function SearchBar() {
  const { fetchPokemonsBySearch } = useStore();

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const search = (event.target as HTMLFormElement).searchBar.value;
    fetchPokemonsBySearch(search);
  };

  return (
    <form className={styles.Container} onSubmit={handleSearch}>
      <label htmlFor='searchBar' className={styles.Label}>
        <IconSearch />
        Search your Pokemon:
      </label>
      <div className={styles.InputContainer}>
        <input type='search' placeholder='I choose you!' id='searchBar' className={styles.Input} />
        <button type='submit' className={styles.Button}>
          <IconSearch />
        </button>
      </div>
    </form>
  );
}
