import {
  useEffect,
  useState,
} from 'react';
import {
  Link,
  Outlet,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconLibrary } from 'config';
import './Layout.css';

const Layout = () => {
  const [pokeCoins, setPokeCoins] = useState(0);

  useEffect(() => {
    const coins = JSON.parse(localStorage.getItem('pokeCoins'));

    setPokeCoins(coins);
  }, [pokeCoins]);

  return (
    <>
      <nav>
        <ul>
          <li>
            <FontAwesomeIcon icon={iconLibrary.faCoins} /><span>{pokeCoins} coins</span>
          </li>
          <li>
            <FontAwesomeIcon icon={iconLibrary.faHouseUser} /><Link to={'/dashboard'}><span>Dashboard</span></Link>
          </li>
        </ul>
      </nav>
      <Outlet context={{ pokeCoins, pokeCoinUpdate: setPokeCoins }} />
      <div className={'content-wrap'}></div>
      <footer>
        <p>Tokugawa Pokemon Distributor, Inc.</p>
        <p>2023.</p>
        <p>built with react & pokeapi.co</p>
      </footer>
    </>
  );
};

export default Layout;
