import {
  useEffect,
  useState,
} from 'react';
import {
  useOutletContext,
  useParams,
} from 'react-router-dom';
import {
  AreaFight,
  FightOverview,
  PokemonSelector,
} from 'components';
import { randomNumberGenerator } from 'utils';
import { DEFAULT_BET } from 'utils/constants.js';
import './AreaFightPage.css';

const AreaFightPage = () => {
  const { pokeCoinUpdate } = useOutletContext();
  const { area } = useParams();

  const [loading, setLoading] = useState(true);
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [betOnMatch, setBetOnMatch] = useState(DEFAULT_BET);
  const [fightResult, setFightResult] = useState(null);

  const getEnemy = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/location-area/${area}/`);
    const areaInfo = await response.json();

    const randomNumber = randomNumberGenerator(0, areaInfo.pokemon_encounters.length - 1);
    const enemyResponse = await fetch(areaInfo.pokemon_encounters[randomNumber].pokemon.url);
    const enemyData = await enemyResponse.json();

    setOpponentPokemon(enemyData);
  };

  const handleChoose = async (id, bet) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const pokeData = await response.json();

    setBetOnMatch(bet);
    setPlayerPokemon(pokeData);
  };

  const handleResult = ({ winner, pokemon, beaten }) => {
    const storage = JSON.parse(localStorage.getItem('pokemonStorage'));
    const coins = JSON.parse(localStorage.getItem('pokeCoins'));

    if (winner === 'player') {
      localStorage.setItem('pokeCoins', JSON.stringify(coins + (betOnMatch * 2)));
      localStorage.setItem('pokemonStorage', JSON.stringify([...storage, beaten]));

      pokeCoinUpdate(coins + (betOnMatch * 2));
    } else if (winner === 'enemy') {
      localStorage.setItem('pokeCoins', JSON.stringify(coins - betOnMatch));

      pokeCoinUpdate(coins - betOnMatch);
    }

    setFightResult({ winner, pokemon, beaten });
  };

  useEffect(() => {
    getEnemy();
    setLoading(false);
  }, []);

  return (
    <div className={'area-fight-page-container'}>
      {!fightResult ?
        !loading && playerPokemon ?
          <AreaFight
            enemy={opponentPokemon}
            player={playerPokemon}
            bet={betOnMatch}
            result={handleResult}
          /> :
          <PokemonSelector
            enemy={opponentPokemon}
            onChoose={handleChoose}
          /> :
        <FightOverview
          bet={betOnMatch}
          fightResult={fightResult}
        />
      }
    </div>

  );
};

export default AreaFightPage;
