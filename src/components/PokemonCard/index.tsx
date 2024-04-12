import { type IPokemon } from '@/types.d';
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
import styles from './PokemonCard.module.css';
import { IconRuler2, IconWeight } from '@tabler/icons-react';

const POKEMON_TYPES = {
  bug: { styleType: 'BugType', styleTypeCard: 'BugTypeCard', icon: <BugIcon /> },
  dark: { styleType: 'DarkType', styleTypeCard: 'DarkTypeCard', icon: <DarkIcon /> },
  dragon: { styleType: 'DragonType', styleTypeCard: 'DragonTypeCard', icon: <DragonIcon /> },
  electric: { styleType: 'ElectricType', styleTypeCard: 'ElectricTypeCard', icon: <ElectricIcon /> },
  fairy: { styleType: 'FairyType', styleTypeCard: 'FairyTypeCard', icon: <FairyIcon /> },
  fighting: { styleType: 'FightingType', styleTypeCard: 'FightingTypeCard', icon: <FightingIcon /> },
  fire: { styleType: 'FireType', styleTypeCard: 'FireTypeCard', icon: <FireIcon /> },
  flying: { styleType: 'FlyingType', styleTypeCard: 'FlyingTypeCard', icon: <FlyingIcon /> },
  ghost: { styleType: 'GhostType', styleTypeCard: 'GhostTypeCard', icon: <GhostIcon /> },
  grass: { styleType: 'GrassType', styleTypeCard: 'GrassTypeCard', icon: <GrassIcon /> },
  ground: { styleType: 'GroundType', styleTypeCard: 'GroundTypeCard', icon: <GroundIcon /> },
  ice: { styleType: 'IceType', styleTypeCard: 'IceTypeCard', icon: <IceIcon /> },
  normal: { styleType: 'NormalType', styleTypeCard: 'NormalTypeCard', icon: <NormalIcon /> },
  poison: { styleType: 'PoisonType', styleTypeCard: 'PoisonTypeCard', icon: <PoisonIcon /> },
  psychic: { styleType: 'PsychicType', styleTypeCard: 'PsychicTypeCard', icon: <PsychicIcon /> },
  rock: { styleType: 'RockType', styleTypeCard: 'RockTypeCard', icon: <RockIcon /> },
  steel: { styleType: 'SteelType', styleTypeCard: 'SteelTypeCard', icon: <SteelIcon /> },
  water: { styleType: 'WaterType', styleTypeCard: 'WaterTypeCard', icon: <WaterIcon /> },
};

interface Props {
  data: IPokemon;
}

export function PokemonCard({ data }: Props) {
  return (
    <article className={`${styles.PokemonCard} ${styles[`${POKEMON_TYPES[data.types[0]].styleTypeCard}`]}`}>
      <figure className={styles.ImageContainer}>
        <img src={data.sprite} alt={data.name} />
      </figure>
      <h2 className={styles.Name}>{data.name}</h2>
      <ul className={styles.ListType}>
        {data.types.map((type) => (
          <li key={type} className={`${styles.Type} ${styles[`${POKEMON_TYPES[type].styleType}`]}`}>
            {POKEMON_TYPES[type].icon}
            {type}
          </li>
        ))}
      </ul>
      <div className={styles.Details}>
        <p>
          {`${data.height / 10} M`}
          <span>
            <IconRuler2 /> Height
          </span>
        </p>
        <p>
          {`${data.weight / 10} Kg`}
          <span>
            <IconWeight /> Weight
          </span>
        </p>
      </div>
    </article>
  );
}
