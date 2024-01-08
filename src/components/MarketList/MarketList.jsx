import { v4 as uuidv4 } from 'uuid';
import { GenericButton } from 'components';
import { calculatePrice } from 'utils';
import { DECREASE_SELL_PRICE_BY } from 'utils/constants';
import './MarketList.css';

const MarketList = ({ pokemonForSell, onBuyClick, onSellClick, mode }) => {
  const convertToCard = (pokemon) => {
    return (
      <div className={'market-card'} key={uuidv4()}>
        <p className={'pokemon-name'}>{pokemon.name}</p>
        <div className={'card-content'}>
          <img className={'market-img-front'} src={pokemon.sprites.front_default} alt={'pokemon sprite image'}></img>
          <img className={'market-img-back'} src={pokemon.sprites.back_default ? pokemon.sprites.back_default : pokemon.sprites.front_default} alt={'pokemon sprite image'}></img>
          <div className={'market-card-stats'}>
            {pokemon.stats.map((pokeStat) => <p key={uuidv4()}>{pokeStat.stat.name}: {pokeStat.base_stat}</p>)}
          </div>
        </div>
        <div className={'market-card-controls'}>
          <p>Price: {mode === 'buy' ? calculatePrice(pokemon) : calculatePrice(pokemon) - DECREASE_SELL_PRICE_BY}</p>
          {mode === 'buy' ?
            <GenericButton onClick={(event) => onBuyClick(event.target.dataset.pokeid)} pokeId={pokemon.id} buttonText={'Buy'} /> :
            <GenericButton onClick={(event) => onSellClick(event.target.dataset.pokeid)} pokeId={pokemon.id} buttonText={'Sell'} />}
        </div>
      </div>
    );
  };

  return (
    <div className={'market-list-container'}>
      {pokemonForSell.map((pokemon) => convertToCard(pokemon))}
    </div>
  );
};

export default MarketList;
