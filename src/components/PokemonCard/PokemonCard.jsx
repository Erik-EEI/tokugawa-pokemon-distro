import {
  useEffect,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { transformToTitleCase } from 'utils';
import { iconLibrary } from 'config';
import './PokemonCard.css';

const PokemonCard = ({ pokemon, onClick, selected, mode }) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    if (mode === 'select') {
      onClick();
    }
  };

  useEffect(() => {
    if (mode === 'select' && selected?.id === pokemon.id) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [selected]);

  return (
    <div onClick={handleClick} className={active ? 'card-container card-active' : 'card-container'}>
      <div>
        <span>{transformToTitleCase(pokemon.name)}</span>
        <img src={pokemon.sprites.front_default} alt={'pokemon sprite'} />
      </div>
      <div>
        <FontAwesomeIcon icon={iconLibrary.faBone} /><span>HP:{pokemon.stats[0].base_stat}</span>
      </div>
      <div>
        <FontAwesomeIcon icon={iconLibrary.faChessRook} /><span>Attack:{pokemon.stats[1].base_stat}</span>
      </div>
      <div>
        <FontAwesomeIcon icon={iconLibrary.faShield} /><span>Defense:{pokemon.stats[2].base_stat}</span>
      </div>
    </div>
  );
};

export default PokemonCard;
