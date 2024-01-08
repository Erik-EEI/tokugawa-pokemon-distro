import {
  useEffect,
  useState,
} from 'react';
import {
  Link,
  useParams,
} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  GenericButton,
  PokemonCard,
} from 'components';
import { COINS_PER_RETREAT, DECREASE_BET_BY, DEFAULT_BET, HISTORY_ID_LENGTH, INCREASE_BET_BY } from 'utils/constants';
import './PokemonSelector.css';

const PokemonSelector = ({ enemy, onChoose }) => {
  const { area } = useParams();

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [playerStorage, setPlayerStorage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [betAmount, setBetAmount] = useState(DEFAULT_BET);

  const loadTeam = async () => {
    const storage = JSON.parse(localStorage.getItem('pokemonActiveTeam'));

    if (storage) {
      const extendedData = await Promise.all(storage.map(async (url) => {
        const response = await fetch(url);
        const data = await response.json();

        return data;
      }));

      setPlayerStorage(extendedData);
    } else {
      setPlayerStorage([]);
    }
  };

  const handleIncreaseBet = () => {
    const coins = JSON.parse(localStorage.getItem('pokeCoins'));

    if (betAmount + INCREASE_BET_BY < coins) {
      setBetAmount(betAmount + INCREASE_BET_BY);
    }
  };

  const handleDecreaseBet = () => {
    if (betAmount - DECREASE_BET_BY > 0) {
      setBetAmount(betAmount - DECREASE_BET_BY);
    }
  };

  const handleRetreat = () => {
    const history = JSON.parse(localStorage.getItem('battleHistory'));
    const coins = JSON.parse(localStorage.getItem('pokeCoins'));
    let battleId = 'AB-00001';

    if (history.length > 0) {
      battleId = `AB-${`${history.length + 1}`.padStart(HISTORY_ID_LENGTH, 0)}`;
    }

    const battleHistory = {
      id:battleId,
      areaUrl: `https://pokeapi.co/api/v2/location-area/${area}/`,
      opponentUrl:`https://pokeapi.co/api/v2/pokemon/${enemy.id}/`,
      playerUrl: false,
      isPlayerWon: false,
      isRetreat: true,
      profit: -100,
      date: new Date().toISOString().split('T')[0],
    };

    localStorage.setItem('battleHistory', JSON.stringify([...history, battleHistory]));


    localStorage.setItem('pokeCoins', JSON.stringify(coins - COINS_PER_RETREAT));
  };

  useEffect(() => {
    setLoading(true);
    loadTeam();
    setLoading(false);
  }, []);

  return (
    <div className={'background-blur'}>
      <div className={'pokemon-selector-panel'}>
        <h1>Please select your Pokemon</h1>
        <div className={'selector-panel-enemy'}>
          <h1>ENEMY</h1>
          {enemy && <PokemonCard pokemon={enemy}/>}
        </div>
        <div className={'selector-panel-team'}>
          <h1>YOUR TEAM</h1>
          <div className={'team-options'}>
            {!loading && playerStorage.map((pokemon) => {
              return (
                <PokemonCard
                  key={uuidv4()}
                  pokemon={pokemon}
                  mode={'select'}
                  selected={selectedPokemon}
                  onClick={() => setSelectedPokemon(pokemon)}
                />
              );
            })}
          </div>
        </div>
        <div className={'start-stop-buttons'}>
          <Link to={'/dashboard'}>
            <GenericButton onClick={handleRetreat} buttonText={'RETREAT'} />
          </Link>
          <div className={'fight-bet-controls'}>
            <GenericButton onClick={handleDecreaseBet} buttonText={'<'} />
            <div className={'area-bet-display'}>{betAmount}</div>
            <GenericButton onClick={handleIncreaseBet} buttonText={'>'} />
          </div>
          <GenericButton disabled={!selectedPokemon} onClick={() => onChoose(selectedPokemon.id, betAmount)} buttonText={'START'} />
        </div>
      </div>
    </div>
  );
};

export default PokemonSelector;
