import {
  useEffect,
  useState,
} from 'react';
import { randomNumberGenerator } from 'utils';
import {
  GenericButton,
  LoadingSpinner,
} from 'components';
import './AreaFight.css';

const AreaFight = ({ enemy, player, bet, result }) => {
  const [playerHealth, setPlayerHealth] = useState(player.stats[0].base_stat);
  const [enemyHealth, setEnemyHealth] = useState(enemy.stats[0].base_stat);
  const [battleState, setBattleState] = useState('prep');
  const [battleTurn, setBattleTurn] = useState(false);
  const [playerShakeAnim, setPlayerShakeAnim] = useState(false);
  const [enemyShakeAnim, setEnemyShakeAnim] = useState(false);

  const attack = () => {
    if (battleTurn) {
      setEnemyShakeAnim(true);
      setTimeout(() => setEnemyShakeAnim(false), 500);

      const playerAttack = player.stats[1].base_stat;
      const enemyDefense = enemy.stats[2].base_stat;
      const randomNum = randomNumberGenerator(217, 255);
      const damageToEnemy = ((((2 / 5 + 2) * playerAttack * 60 / enemyDefense) / 50) + 2) * randomNum / 255;

      setBattleTurn(!battleTurn);
      setEnemyHealth(enemyHealth - damageToEnemy);
    } else {
      setPlayerShakeAnim(true);
      setTimeout(() => setPlayerShakeAnim(false), 500);

      const enemyAttack = enemy.stats[1].base_stat;
      const playerDefense = player.stats[2].base_stat;
      const randomNum = randomNumberGenerator(217, 255);
      const damageToPlayer = ((((2 / 5 + 2) * enemyAttack * 60 / playerDefense) / 50) + 2) * randomNum / 255;

      setBattleTurn(!battleTurn);
      setPlayerHealth(playerHealth - damageToPlayer);
    }
  };

  const fightProcess = () => {
    if (battleState === 'fight') {
      if (playerHealth < 0) {
        result({
          winner:'enemy',
          pokemon: `https://pokeapi.co/api/v2/pokemon/${enemy.id}/`,
          beaten:`https://pokeapi.co/api/v2/pokemon/${player.id}/`,
        });
        setBattleState('finished');
      } else if (enemyHealth < 0) {
        result({
          winner:'player',
          pokemon: `https://pokeapi.co/api/v2/pokemon/${player.id}/`,
          beaten:`https://pokeapi.co/api/v2/pokemon/${enemy.id}/`,
        });
        setBattleState('finished');
      } else {
        attack();
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fightProcess();
    }, 1000);
  }, [battleTurn, battleState]);

  return (
    <div className='fight-component-container'>
      <div className='fight-player-area'>
        <div className={`fight-player-pokemon ${playerShakeAnim ? 'shake' : ''}`}>
          <h2>{player.name}</h2>
          <progress value={playerHealth} max={player.stats[0].base_stat}/>
          <img className='fight-img-player' src={player.sprites.back_default ? player.sprites.back_default : player.sprites.front_default}></img>
        </div>
      </div>
      <div className='fight-enemy-area'>
        <div className={`fight-enemy-pokemon ${enemyShakeAnim ? 'shake' : ''}`}>
          <h2>{enemy.name}</h2>
          <progress value={enemyHealth} max={enemy.stats[0].base_stat}/>
          <img className='fight-img-enemy' src={enemy.sprites.front_default}></img>
        </div>
      </div>
      <div className='fight-control-bar'>
        <div className='fight-bet-display'>
          <h1>Your bet: {bet} coins.</h1>
        </div>
        <GenericButton
          className='fight-start'
          onClick={() => setBattleState('fight')}
          buttonText={battleState === 'fight' ? <LoadingSpinner/> : 'FIGHT'}
          disabled={battleState === 'fight'}
        />
      </div>
    </div>
  );

};

export default AreaFight;
