import {
  useEffect,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingSpinner } from 'components';
import { iconLibrary } from 'config';
import { transformToTitleCase } from 'utils';
import './HistoryCard.css';

const HistoryCard = ({ battle }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [area, setArea] = useState(null);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        if (!battle.isRetreat) {
          const [playerPokemon, opponentPokemon, area] = await Promise.all([
            fetch(battle.playerUrl, { method: 'GET' }).then((response) => response.json()),
            fetch(battle.opponentUrl, { method: 'GET' }).then((response) => response.json()),
            fetch(battle.areaUrl, { method: 'GET' }).then((response) => response.json()),
          ]);

          setPlayerPokemon(playerPokemon);
          setOpponentPokemon(opponentPokemon);
          const englishNameIndex = area.names.findIndex((element) => element.language.name === 'en');
          const englishName = area.names[englishNameIndex].name;

          setArea(englishName);
        }

        if (battle.isRetreat) {
          const [opponentPokemon, area] = await Promise.all([
            fetch(battle.opponentUrl, { method: 'GET' }).then((response) => response.json()),
            fetch(battle.areaUrl, { method: 'GET' }).then((response) => response.json()),
          ]);

          setPlayerPokemon(playerPokemon);
          setOpponentPokemon(opponentPokemon);

          const englishNameIndex = area.names.findIndex((element) => element.language.name === 'en');
          const englishName = area.names[englishNameIndex].name;

          setArea(englishName);
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getPokemon();
  }, []);

  return (
    <div className={'history-card-container'}>
      {!isLoading ?
        !battle.isRetreat ?
          <>
            <div className={'history-card-title'}>
              <span>{transformToTitleCase(playerPokemon.name)} vs. {transformToTitleCase(opponentPokemon.name)}.</span>
              <div><img src={playerPokemon.sprites.front_default} alt={'pokemon sprite'} /> vs. <img src={opponentPokemon.sprites.front_default} alt={'pokemon sprite'} /></div>
            </div>
            <div>
              <span><FontAwesomeIcon icon={iconLibrary.faLocationDot} /> Area: {area}.</span>
            </div>
            <div>
              <span><FontAwesomeIcon icon={iconLibrary.faStar} /> WINNER: {battle.isPlayerWon ? `Your ${transformToTitleCase(playerPokemon.name)} has won.` : `The opponent ${transformToTitleCase(opponentPokemon.name)} has won.`}</span>
            </div>
            <div>
              <span><FontAwesomeIcon icon={iconLibrary.faSackDollar} /> BALANCE {battle.profit} coins.</span>
            </div>
          </> :
          <>
            <div className={'history-card-title'}>
              <span>You have retreated from {transformToTitleCase(opponentPokemon.name)} and lost the battle.</span>
              <div><img src={opponentPokemon.sprites.front_default} alt={'pokemon sprite'} /></div>
            </div>
            <div>
              <span><FontAwesomeIcon icon={iconLibrary.faLocationDot} /> Area: {area}</span>
            </div>
            <div>
              <span><FontAwesomeIcon icon={iconLibrary.faSackDollar} /> BALANCE {battle.profit} coins.</span>
            </div>
          </> :
        <LoadingSpinner />}
    </div>
  );
};

export default HistoryCard;
