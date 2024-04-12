import {
  BugIcon,
  DarkIcon,
  DragonIcon,
  ElectricIcon,
  FairyIcon,
  FightingIcon,
  FireIcon,
  FlyingIcon,
  GhostIcon,
  GrassIcon,
  GroundIcon,
  IceIcon,
  NormalIcon,
  PoisonIcon,
  PsychicIcon,
  RockIcon,
  SteelIcon,
  WaterIcon,
} from '@/icons';
import { TPokemonType } from '@/types';
import styles from './TypeFilter.module.css';
import { IconStar } from '@tabler/icons-react';

const POKEMON_TYPES: Record<TPokemonType, { style: string; icon: JSX.Element }> = {
  bug: { style: 'BugType', icon: <BugIcon /> },
  dark: { style: 'DarkType', icon: <DarkIcon /> },
  dragon: { style: 'DragonType', icon: <DragonIcon /> },
  electric: { style: 'ElectricType', icon: <ElectricIcon /> },
  fairy: { style: 'FairyType', icon: <FairyIcon /> },
  fighting: { style: 'FightingType', icon: <FightingIcon /> },
  fire: { style: 'FireType', icon: <FireIcon /> },
  flying: { style: 'FlyingType', icon: <FlyingIcon /> },
  ghost: { style: 'GhostType', icon: <GhostIcon /> },
  grass: { style: 'GrassType', icon: <GrassIcon /> },
  ground: { style: 'GroundType', icon: <GroundIcon /> },
  ice: { style: 'IceType', icon: <IceIcon /> },
  normal: { style: 'NormalType', icon: <NormalIcon /> },
  poison: { style: 'PoisonType', icon: <PoisonIcon /> },
  psychic: { style: 'PsychicType', icon: <PsychicIcon /> },
  rock: { style: 'RockType', icon: <RockIcon /> },
  steel: { style: 'SteelType', icon: <SteelIcon /> },
  water: { style: 'WaterType', icon: <WaterIcon /> },
};

export const TypeFilter = () => {
  return (
    <div className={styles.Container}>
      <span className={styles.Label}>
        <IconStar />
        Search by type
      </span>
      <ul className={styles.Filters}>
        {Object.keys(POKEMON_TYPES).map((type) => (
          <li key={type} className={`${styles.Type} ${styles[POKEMON_TYPES[type as TPokemonType].style]}`}>
            {POKEMON_TYPES[type as TPokemonType].icon}
          </li>
        ))}
      </ul>
    </div>
  );
};
