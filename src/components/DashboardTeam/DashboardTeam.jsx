import {
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import {
  DashboardSectionTitle,
  GenericButton,
  LoadingSpinner,
  PokemonCard,
} from 'components';
import './DashboardTeam.css';
import { v4 as uuidv4 } from 'uuid';

const DashboardTeam = () => {
  const [activeTeam, setActiveTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPokemonTeam = async () => {
      try {
        const pokemonTeam = JSON.parse(localStorage.getItem('pokemonActiveTeam'));

        await Promise.all(pokemonTeam.map(async (pokemon) => {
          const response = await fetch(pokemon, {
            method: 'GET',
          });
          const data = await response.json();

          setActiveTeam((previousState) => [...previousState, data]);
        }));

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getPokemonTeam();
  }, []);

  const activeTeamComponents = activeTeam.map((pokemon) => {
    return (
      <article key={uuidv4()} className={'team-pokemon-card'}>
        <PokemonCard pokemon={pokemon} />
      </article>
    );
  });

  return (
    <>
      {!isLoading ?
        <>
          <DashboardSectionTitle sectionTitle={'Active Team'} />
          <div className={'team-card-container'}>
            {activeTeamComponents}
          </div>
          <Link to={'/dashboard/team-management'}><GenericButton buttonText={'Manage Team & Storage'} /></Link>
        </> :
        <LoadingSpinner />}
    </>
  );
};

export default DashboardTeam;
