import {
  useEffect,
  useState,
} from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  GenericButton,
  LoadingSpinner,
  MarketList,
} from 'components';
import {
  buyPokemon,
  randomNumberGenerator,
  refreshMarket,
  sellPokemon,
} from 'utils';
import './MarketplacePage.css';

const MarketplacePage = () => {
  const { pokeCoinUpdate } = useOutletContext();

  const [loading, setLoading] = useState(true);
  const [pokemonOnSale, setPokemonOnSale] = useState([]);
  const [playerStorage, setPlayerStorage] = useState([]);
  const [isMarketplaceRefreshed, setIsMarketplaceRefreshed] = useState(false);
  const [mode, setMode] = useState('buy');
  const [canRefresh, setCanRefresh] = useState(true);

  const getRandomPokemons = async () => {
    if (!localStorage.getItem('isMarketplaceRefreshed')) {
      localStorage.setItem('isMarketplaceRefreshed', JSON.stringify(false));
    }

    if (localStorage.getItem('marketPlaceOnSale')) {
      const pokemonSelection = JSON.parse(localStorage.getItem('marketPlaceOnSale'));

      setPokemonOnSale(pokemonSelection);
    }

    if (!JSON.parse(localStorage.getItem('isMarketplaceRefreshed')) || !JSON.parse(localStorage.getItem('marketPlaceOnSale'))) {
      const marketPokemons = await refreshMarket();

      localStorage.setItem('isMarketplaceRefreshed', JSON.stringify(true));
      localStorage.setItem('marketPlaceOnSale', JSON.stringify(marketPokemons));

      setPokemonOnSale(marketPokemons);
    }

    setIsMarketplaceRefreshed(JSON.parse(localStorage.getItem('isMarketplaceRefreshed')));
  };

  const loadPlayerStorage = async () => {
    const storage = JSON.parse(localStorage.getItem('pokemonStorage'));

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

  const handleRefresh = () => {
    const coins = JSON.parse(localStorage.getItem('pokeCoins'));
    const numberOfPokemonInMarket = randomNumberGenerator(6, 12);

    localStorage.setItem('pokeCoins', JSON.stringify(coins - 100));
    pokeCoinUpdate(coins - 100);

    localStorage.setItem('isMarketplaceRefreshed', JSON.stringify(false));
    localStorage.setItem('numberOfPokemonInMarket', JSON.stringify(numberOfPokemonInMarket));

    setIsMarketplaceRefreshed(false);
  };

  const handleBuyClick = (id) => {
    const newPokemonOnSale = buyPokemon(pokemonOnSale, pokeCoinUpdate, id);

    setPokemonOnSale(newPokemonOnSale);
  };

  const handleSellClick = (id) => {
    const newStorage = sellPokemon(pokeCoinUpdate, playerStorage, id);

    setPlayerStorage(newStorage);
  };

  const checkRefreshPrice = () => {
    const coins = JSON.parse(localStorage.getItem('pokeCoins'));

    setCanRefresh(coins - 100 >= 0) ;
  };

  useEffect(() => {
    getRandomPokemons();
    loadPlayerStorage();
    checkRefreshPrice();

    setLoading(false);
  }, [isMarketplaceRefreshed, mode]);

  return (
    <div className={'market-page-container'}>
      <div className={'market-mode-selectors'}>
        <GenericButton
          onClick={() => setMode('buy')}
          activeClass={mode === 'buy' ? 'active' : ''}
          buttonText={'Buy'}
        />
        {mode === 'buy' &&
        <>
          {isMarketplaceRefreshed ?
            <div>
              <GenericButton disabled={!canRefresh} onClick={handleRefresh} buttonText={'Refresh Pokemon list'} />
              <p>You may refresh the list for 100 coins to get new offers.</p>
            </div> :
            <p>Refreshing the list...</p>}
        </>}
        <GenericButton
          onClick={() => setMode('sell')}
          activeClass={mode === 'sell' ? 'active' : ''}
          buttonText={'Sell'}
        />
      </div>
      <div className={'market-list'}>
        {loading ?
          <LoadingSpinner /> :
          <MarketList
            pokemonForSell={mode === 'buy' ? pokemonOnSale : playerStorage}
            onBuyClick ={handleBuyClick}
            onSellClick={handleSellClick}
            mode={mode}
          />}
      </div>
    </div>
  );
};

export default MarketplacePage;
