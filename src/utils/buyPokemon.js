import calculatePrice from './calculatePrice';

const buyPokemon = (pokemonOnSale, pokeCoinUpdate, id) => {
  const newPokemonOnSale = [...pokemonOnSale];
  const index = newPokemonOnSale.findIndex((pokemon) => pokemon.id === Number(id));
  const coins = JSON.parse(localStorage.getItem('pokeCoins'));

  if (calculatePrice(newPokemonOnSale[index]) <= coins) {
    const boughtPokemon = newPokemonOnSale.splice(index, 1)[0];
    const boughtPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemonStorage = JSON.parse(localStorage.getItem('pokemonStorage'));

    localStorage.setItem('marketPlaceOnSale', JSON.stringify(newPokemonOnSale));

    pokemonStorage.push(boughtPokemonUrl);
    localStorage.setItem('pokemonStorage', JSON.stringify(pokemonStorage));
    localStorage.setItem('pokeCoins', JSON.stringify(coins - calculatePrice(boughtPokemon)));
    pokeCoinUpdate(coins - calculatePrice(boughtPokemon));
  }

  return newPokemonOnSale;
};

export default buyPokemon;
