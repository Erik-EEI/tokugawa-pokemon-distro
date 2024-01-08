import {
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  GenericButton,
  LoadingSpinner,
  PokemonCard,
} from 'components';
import './TeamManagementPage.css';

const TeamManagementPage = () => {
  const [activeTeam, setActiveTeam] = useState([]);
  const [pokeStorage, setPokeStorage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedActive, setSelectedActive] = useState(null);
  const [open, setOpen] = useState(false);

  const loadActiveTeam = async () => {
    const team = JSON.parse(localStorage.getItem('pokemonActiveTeam'));
    const loadedTeam = await Promise.all(team.map(async (pokemonURL) => {
      const response = await fetch(pokemonURL);
      const pokemonData = await response.json();

      return pokemonData;
    }));

    setActiveTeam(loadedTeam);
  };

  const loadStorage = async () => {
    const storage = JSON.parse(localStorage.getItem('pokemonStorage'));
    const loadedStorage = await Promise.all(storage.map(async (pokemonURL) => {
      const response = await fetch(pokemonURL);
      const pokemonData = await response.json();

      return pokemonData;
    }));

    setPokeStorage(loadedStorage);
  };

  const handleSelectStorage = (pokemon) => {
    setSelectedStorage(pokemon);
  };

  const handleChangePokemon = (activePokemon) => {
    if (selectedStorage) {
      const team = JSON.parse(localStorage.getItem('pokemonActiveTeam'));
      const indexOfActive = team.findIndex((pokeURL) => pokeURL === `https://pokeapi.co/api/v2/pokemon/${activePokemon.id}`);

      const pokemonURLtoStorage = team.splice(indexOfActive, 1, `https://pokeapi.co/api/v2/pokemon/${selectedStorage.id}`);

      const storage = JSON.parse(localStorage.getItem('pokemonStorage'));
      const indexOfStorage = storage.findIndex((pokeURL) => pokeURL === `https://pokeapi.co/api/v2/pokemon/${selectedStorage.id}`);

      storage.splice(indexOfStorage, 1, pokemonURLtoStorage[0]);

      localStorage.setItem('pokemonActiveTeam', JSON.stringify(team));
      localStorage.setItem('pokemonStorage', JSON.stringify(storage));
      setSelectedActive(activePokemon);
      setSelectedStorage(null);
    }
  };

  const handleOnClickOpen = () => {
    setOpen(true);
  };

  const handleOnClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    loadActiveTeam();
    loadStorage();
    setLoading(false);
  }, [selectedStorage, selectedActive]);

  return (
    <div className='team-management-container'>
      <div className='team-management-active-container'>
        <div className='management-top-control'>
          <Link to={'/dashboard/marketplace'}>
            <GenericButton buttonText={'BUY MORE'}/>
          </Link>
          <h1>ACTIVE TEAM</h1>
          <GenericButton buttonText={'HOW TO'} onClick={handleOnClickOpen} />
          <dialog
            open={open}
            onClose={handleOnClose}
          >
            <div className='team-howto-window'>
              <h1 id='alert-dialog-title'>
              HOW TO MANAGE YOUR TEAM
              </h1>
              <div className='dialog-text-content'>
                <p id='alert-dialog-description'>
                  1. Click on a pokemon from your storage.<br/>
                  2. Click on the pokemon from the active team, that you want to change.
                </p>
              </div>
              <div className='dialog-controls'>
                <GenericButton buttonText={'OK'} onClick={handleOnClose} />
              </div>
            </div>
          </dialog>
        </div>
        <div className='team-management-active-cards'>
          {!loading ?
            activeTeam.map((pokemon) =>
              <PokemonCard
                key={uuidv4()}
                pokemon={pokemon}
                mode={open ? null : 'select'}
                selected={selectedActive}
                onClick={() => handleChangePokemon(pokemon)}
              />) :
            <LoadingSpinner />}
        </div>
      </div>
      <div className='team-management-storage-container'>
        <h1>POKEMON STORAGE</h1>
        <div className='team-management-storage-cards'>
          {!loading ?
            pokeStorage.map((pokemon) =>
              <PokemonCard
                key={uuidv4()}
                pokemon={pokemon}
                mode={open ? null : 'select'}
                selected={selectedStorage}
                onClick={() => handleSelectStorage(pokemon)}
              />) :
            <LoadingSpinner />}
        </div>
      </div>
    </div>
  );
};

export default TeamManagementPage;
