import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.Header}>
      <img src='./pokemon-logo.svg' alt='Pokemon logo' />
    </header>
  );
};
