import {
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import {
  DashboardSectionTitle,
  GenericButton,
} from 'components';
import './DashboardMarket.css';

const DashboardMarket = () => {
  const [pokeCoins, setPokeCoins] = useState(0);
  const [numberOfPokemonInMarket, setNumberOfPokemonInMarket] = useState(0);

  useEffect(() => {
    setPokeCoins(JSON.parse(localStorage.getItem('pokeCoins')));
    setNumberOfPokemonInMarket(JSON.parse(localStorage.getItem('numberOfPokemonInMarket')));
  }, []);

  return (
    <>
      <DashboardSectionTitle sectionTitle={'Marketplace'} />
      <div className={'dashboard-marketplace-content'}>
        <p>You currently have {pokeCoins} PokeCoins.</p>
        <p>There are currently {numberOfPokemonInMarket} Pokemon being sold at the Marketplace. Check them out before they are gone!</p>
      </div>
      <Link to={'/dashboard/marketplace'}>
        <GenericButton buttonText={'Buy & Sell Pokemon'} />
      </Link>
    </>
  );
};

export default DashboardMarket;
