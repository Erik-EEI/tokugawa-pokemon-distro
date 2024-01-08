import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  NewPlayerIntroduction,
  ReturningPlayerIntroduction,
} from 'components';
import { randomNumberGenerator } from 'utils';
import heroImage from 'assets/images/welcome_page_hero.jpg';
import './WelcomePage.css';

const WelcomePage = () => {
  useEffect(() => {
    if (!localStorage.getItem('pokeCoins')) {
      const numberOfPokemonInMarket = randomNumberGenerator(6, 12);

      localStorage.setItem('numberOfPokemonInMarket', JSON.stringify(numberOfPokemonInMarket));
    }

    if (!localStorage.getItem('pokeCoins')) {
      localStorage.setItem('pokeCoins', JSON.stringify(1200));
      localStorage.setItem('newPlayer', JSON.stringify(true));
    }

    if (!localStorage.getItem('pokemonStorage')) {
      const pokemonActiveTeam = [
        'https://pokeapi.co/api/v2/pokemon/11',
        'https://pokeapi.co/api/v2/pokemon/292',
        'https://pokeapi.co/api/v2/pokemon/493',
      ];

      const pokemonStorage = [
        'https://pokeapi.co/api/v2/pokemon/1',
        'https://pokeapi.co/api/v2/pokemon/15',
      ];

      localStorage.setItem('pokemonActiveTeam', JSON.stringify(pokemonActiveTeam));
      localStorage.setItem('pokemonStorage', JSON.stringify(pokemonStorage));
      localStorage.setItem('battleHistory', JSON.stringify([]));
    }
  }, []);

  return (
    <main>
      <section id={'welcome-hero-container'}>
        <img src={heroImage} alt={'welcome page intro image'} />
      </section>
      <section id={'welcome-text-container'}>
        {JSON.parse(localStorage.getItem('newPlayer')) ? <NewPlayerIntroduction /> : <ReturningPlayerIntroduction />}
        <article className={'welcome-text'}>
          <h3>By clicking on the button below, you may reach your personal Dashboard where you can:</h3>
          <ul>
            <li>
              Manage your active Pokemon Team and Pokemon Storage Unit under the Team Management tab.
            </li>
            <li>
              Sell your existing Pokemon from your Storage Unit or buy new ones under the Marketplace tab.
            </li>
            <li>
              Start new adventures to fight and catch more and better Pokemon.
            </li>
          </ul>
        </article>
        <Link to={'/dashboard'} className={'dashboard-link'}>Dashboard</Link>
      </section>
    </main>
  );
};

export default WelcomePage;
