import {
  useEffect,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { transformToTitleCase } from 'utils';
import { iconLibrary } from 'config';
import './HistoryRow.css';

const HistoryRow = ({ battle }) => {
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
    !isLoading && <>
      <p className={`history-value ${battle.isPlayerWon ? 'history-win' : 'history-loss'}`}>{area}</p>
      <p className={`history-value ${battle.isPlayerWon ? 'history-win' : 'history-loss'}`}>{playerPokemon ? `${transformToTitleCase(playerPokemon.name)} vs. ${transformToTitleCase(opponentPokemon.name)}` : 'Retreated from battle'}</p>
      <p className={`history-value ${battle.isPlayerWon ? 'history-win' : 'history-loss'}`}>{battle.profit}</p>
      <p className={`history-value ${battle.isPlayerWon ? 'history-win' : 'history-loss'}`}>{battle.isPlayerWon ? <FontAwesomeIcon icon={iconLibrary.faCrown} /> : <FontAwesomeIcon icon={iconLibrary.faSkull} />}</p>
    </>
  );
};

export default HistoryRow;
