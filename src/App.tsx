import './App.css';
import { Header } from './components/Header';
import { PokemonGrid } from './components/PokemonGrid';
import { StoreProvider } from './context/store';

function App() {
  return (
    <StoreProvider>
      <Header />
      <main>
        <PokemonGrid />
      </main>
    </StoreProvider>
  );
}

export default App;
