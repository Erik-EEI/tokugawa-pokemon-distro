import calculatePrice from './calculatePrice';

const sellPokemon = (pokeCoinUpdate, playerStorage, id) => {
  const newStorage = [...playerStorage];
  const storageIndex = newStorage.findIndex((pokemon) => pokemon.id === Number(id));
  const soldPokemon = newStorage.splice(storageIndex, 1)[0];

  const pokemonStorage = JSON.parse(localStorage.getItem('pokemonStorage'));
  const soldPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const localIndex = pokemonStorage.findIndex((url) => url === soldPokemonUrl);

  const coins = JSON.parse(localStorage.getItem('pokeCoins'));

  pokemonStorage.splice(localIndex, 1);
  localStorage.setItem('pokemonStorage', JSON.stringify(pokemonStorage));

  localStorage.setItem('pokeCoins', JSON.stringify(coins + calculatePrice(soldPokemon) - 150));
  pokeCoinUpdate(coins + calculatePrice(soldPokemon) - 150);

  return newStorage;
};

export default sellPokemon;
