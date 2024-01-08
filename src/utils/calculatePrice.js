const calculatePrice = (pokemon) => {
  return pokemon.stats[1].base_stat * 10;
};

export default calculatePrice;
