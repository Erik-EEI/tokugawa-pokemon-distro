import { randomNumberGenerator } from 'utils';

const refreshMarket = async () => {
  const numberOfPokemonInMarket = JSON.parse(localStorage.getItem('numberOfPokemonInMarket'));
  const pageNumbers = Array.from({ length: numberOfPokemonInMarket }, (() => randomNumberGenerator(1, 1010)));

  const marketPokemons = await Promise.all(pageNumbers.map(async (num) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}/`);
    const pokeData = await response.json();

    return pokeData;
  }));

  return marketPokemons;
};

export default refreshMarket;
