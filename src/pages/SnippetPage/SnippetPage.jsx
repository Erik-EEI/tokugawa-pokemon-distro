import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GenericButton } from 'components';
import { transformToTitleCase } from 'utils';
import { iconLibrary } from 'config';
import codeSnippet from 'assets/images/code-snippet.png';
import './SnippetPage.css';

const SnippetPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [area, setArea] = useState(null);
  const [battle, setBattle] = useState({ isPlayerWon: true, profit: 250 });

  const handleOnClick = async () => {
    const [playerPokemon, opponentPokemon, area] = await Promise.all([
      fetch('https://pokeapi.co/api/v2/pokemon/3', { method: 'GET' }).then((response) => response.json()),
      fetch('https://pokeapi.co/api/v2/pokemon/7', { method: 'GET' }).then((response) => response.json()),
      fetch('https://pokeapi.co/api/v2/location-area/1/', { method: 'GET' }).then((response) => response.json()),
    ]);

    setPlayerPokemon(playerPokemon);
    setOpponentPokemon(opponentPokemon);
    const englishNameIndex = area.names.findIndex((element) => element.language.name === 'en');
    const englishName = area.names[englishNameIndex].name;

    setArea(englishName);
    setBattle({ isPlayerWon: true, profit: 250 });
    setIsLoading(false);
  };

  return (
    <main className={'snippet-container'}>
      <h1>Code Snippet</h1>
      <img src={codeSnippet} alt={'code snippet'} />
      <h2>Why is Promise.all() better than individual async/await calls?</h2>
      <ul>
        <li>
          All promises run concurrently, meaning that they will return faster.
        </li>
        <li>
          If any of the promises gets rejected, it immediately stops running.
        </li>
        <li>
          It is useful if you want to do something only once all promises are returned.
        </li>
        <li>
          It is a useful way to simplify the code.
        </li>
      </ul>
      <div className={'snippet-button-container'}>
        <GenericButton onClick={handleOnClick} buttonText={'Do the magic trick!'} />
      </div>
      {!isLoading &&
        <div className={'snippet-card-container'}>
          <div className={'snippet-card-title'}>
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
        </div> }
    </main>
  );
};


export default SnippetPage;
