import {
  useEffect,
  useState,
} from 'react';
import {
  Link,
  useParams,
} from 'react-router-dom';
import {
  GenericButton,
  PokemonCard,
} from 'components';
import './FightOverview.css';

const FightOverview = ({ fightResult, bet }) => {
  const { area } = useParams();

  const [winningPokemon, setWinningPokemon] = useState(null);
  const [losingPokemon, setLosingPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  const updatePokemons = async () => {
    const winnerRes = await fetch(fightResult.pokemon);
    const winnerPokemon = await winnerRes.json();

    const loserRes = await fetch(fightResult.beaten);
    const loserPokemon = await loserRes.json();

    setWinningPokemon(winnerPokemon);
    setLosingPokemon(loserPokemon);
    setLoading(false);
  };

  const saveFightHistory = () => {
    const history = JSON.parse(localStorage.getItem('battleHistory'));
    let battleId = 'AB-00001';

    if (history.length > 0) {
      battleId = `AB-${`${history.length + 1}`.padStart(5, 0)}`;
    }

    const newHistoryItem = {
      id:battleId,
      areaUrl: `https://pokeapi.co/api/v2/location-area/${area}/`,
      opponentUrl: (fightResult.winner === 'enemy' ? fightResult.pokemon : fightResult.beaten),
      playerUrl: (fightResult.winner === 'player' ? fightResult.pokemon : fightResult.beaten),
      isPlayerWon: fightResult.winner === 'player',
      isRetreat: false,
      profit: fightResult.winner === 'player' ? bet * 2 : bet * -1,
      date: new Date().toISOString().split('T')[0],
    };

    localStorage.setItem('battleHistory', JSON.stringify([...history, newHistoryItem]));
  };

  useEffect(() => {
    updatePokemons();
    saveFightHistory();
  }, []);

  return (
    <div className='fight-overview-background'>
      <div className='fight-overview-container'>
        {!loading && fightResult.winner === 'player' &&
          <div className='player-win-case'>
            <h1>CONGRATULATIONS!</h1>
            <h2>Pokemon acquired:</h2>
            <PokemonCard pokemon={losingPokemon}/>
            <h3>You won: {(bet * 2)} coins.</h3>
            <div className='fight-overview-controls'>
              <Link to={'/dashboard'}>
                <GenericButton buttonText={'DASHBOARD'} />
              </Link>
              <Link to={'/location'}>
                <GenericButton buttonText={'NEXT ADVENTURE'} />
              </Link>
            </div>
          </div>}
        {!loading && fightResult.winner === 'enemy' &&
          <div className='enemy-win-case'>
            <h1>YOU HAVE LOST!</h1>
            <h2>Your opponent:</h2>
            <PokemonCard pokemon={winningPokemon}/>
            <h3>You lost: {bet} coins.</h3>
            <div className='fight-overview-controls'>
              <Link to={'/dashboard'}>
                <GenericButton buttonText={'DASHBOARD'} />
              </Link>
              <Link to={'/location'}>
                <GenericButton buttonText={'NEXT ADVENTURE'} />
              </Link>
            </div>
          </div>}
      </div>
    </div>
  );
};

export default FightOverview;
