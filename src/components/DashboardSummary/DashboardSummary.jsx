import {
  useEffect,
  useState,
} from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  DashboardSectionTitle,
  GenericButton,
  LoadingSpinner,
  PokemonCard,
} from 'components';
import { transformToTitleCase } from 'utils';
import './DashboardSummary.css';

const DashboardSummary = ({ flashDealFetch, flashDealPokemonValue }) => {
  const { pokeCoinUpdate } = useOutletContext();

  const [isFlashDealLoading, setIsFlashDealLoading] = useState(true);
  const [isLatestPokemonLoading, setIsLatestPokemonLoading] = useState(true);

  const [latestPokemon, setLatestPokemon] = useState(undefined);
  const [flashDealPokemon, setFlashDealPokemon] = useState(undefined);
  const [flashDealValue, setFlashDealValue] = useState(flashDealPokemonValue);

  const [isFlashDealButtonClicked, setisFlashDealButtonClicked] = useState(false);
  const [isFlashDealPurchaseable, setIsFlashDealPurchaseable] = useState(true);

  useEffect(() => {
    setFlashDealValue(flashDealPokemonValue);

    if (JSON.parse(localStorage.getItem('pokeCoins')) < flashDealValue) {
      setIsFlashDealPurchaseable(false);
    }

    const getSummaryPokemon = async () => {
      try {
        const pokemonStorage = JSON.parse(localStorage.getItem('pokemonStorage'));

        if (!isFlashDealButtonClicked) {
          try {
            const response = await fetch(pokemonStorage[pokemonStorage.length - 1], { method: 'GET' });
            const data = await response.json();

            setLatestPokemon(data);
            setFlashDealPokemon(flashDealFetch);

            setIsLatestPokemonLoading(false);
            setIsFlashDealLoading(false);
          } catch (error) {
            console.error(error);
          }
        }

        if (isFlashDealButtonClicked) {
          const response = await fetch(pokemonStorage[pokemonStorage.length - 1], {
            method: 'GET',
          });
          const data = await response.json();

          setLatestPokemon(data);
          setIsLatestPokemonLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getSummaryPokemon();
  }, [isFlashDealButtonClicked]);

  const handleFlashDealClick = (pokemon, pokemonPrice, pokeCoinUpdate) => {
    const pokemonStorage = JSON.parse(localStorage.getItem('pokemonStorage'));
    const pokeCoins = JSON.parse(localStorage.getItem('pokeCoins'));

    pokemonStorage.push(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
    localStorage.setItem('pokemonStorage', JSON.stringify(pokemonStorage));

    localStorage.setItem('pokeCoins', JSON.stringify(pokeCoins - pokemonPrice));
    pokeCoinUpdate(pokeCoins - pokemonPrice);

    setisFlashDealButtonClicked(true);
  };

  return (
    <>
      <article className={'summary-flex'}>
        <DashboardSectionTitle sectionTitle={'Last Pokemon Obtained'} />
        {latestPokemon ?
          !isLatestPokemonLoading ?
            <article className={'summary-pokemon-card'}>
              <PokemonCard pokemon={latestPokemon} />
            </article> :
            <LoadingSpinner /> :
          <p>You did not catch any pokemon, yet.</p>}
      </article>
      <article className={'summary-flex'}>
        <DashboardSectionTitle sectionTitle={'Flash Sale Deal'} />
        <div>
          {!isFlashDealLoading ?
            <>
              <div>
                <p>{transformToTitleCase(flashDealPokemon.name)}</p>
                <img src={flashDealPokemon.sprites.front_default} alt={'pokemon sprite'} />
              </div>
              {!isFlashDealButtonClicked ?
                <>
                  <p>15% off - {flashDealValue} coins</p>
                  <GenericButton onClick={() => handleFlashDealClick(flashDealPokemon, flashDealValue, pokeCoinUpdate)} buttonText={'Buy now!'} disabled={!isFlashDealPurchaseable} />
                </> :
                <p>{transformToTitleCase(flashDealPokemon.name)} was added to your Pokemon Storage Unit! Congratz!</p>}
            </> :
            <p>Currently, there is no Pokemon on sale.</p>}
        </div>
      </article>
    </>
  );
};

export default DashboardSummary;
