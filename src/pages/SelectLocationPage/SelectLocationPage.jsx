import {
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import {
  AreaSelector,
  LocationSelector,
} from 'components';
import './SelectLocationPage.css';

const SelectLocationPage = () => {
  const [locations, setLocations] = useState([]);
  const [inspectedLocation, setInspectedLocation] = useState(null);
  const [areas, setAreas] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSeatchValue] = useState('');

  const fetchLocations = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/location');
      const data = await response.json();

      const expandedList = await Promise.all(
        data.results.map(async (location) => {
          const res = await fetch(location.url);
          const expandedData = await res.json();

          return expandedData;
        }),
      );

      setLocations(expandedList);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const fetchAreas = async () => {
    if (inspectedLocation) {
      const newAreas = await Promise.all(
        inspectedLocation.areas.map(async (area) => {
          const response = await fetch(area.url);
          const data = await response.json();

          return data;
        }),
      );

      setAreas(newAreas);
    }
  };

  const handleSearch = () => {
    const regex = new RegExp(searchValue, 'gi');

    const results = locations.filter((loc) => regex.test(loc.name));

    setSearchResults(results);
  };

  useEffect(() => {
    setLoading(true);
    fetchLocations();
    fetchAreas();
    handleSearch();
    setLoading(false);
  }, [inspectedLocation, searchValue]);

  return (
    <div className='location-page-container'>
      <div className='search-bar'>
        <label htmlFor='searchLocation'> Search Location</label>
        <input
          type='text'
          name='searchLocation'
          placeholder='Location ...'
          autoComplete='off'
          onChange={(e) => setSeatchValue(e.target.value)}
        ></input>
      </div>
      <div className='scroll-menu'>
        {loading ?
          'Loading' :
          <LocationSelector
            locations={searchValue === '' ? locations : searchResults}
            inspectedLocation={inspectedLocation}
            areas={areas}
            inspect={setInspectedLocation}
          />}
      </div>
      <div className='areas'>
        <p>Areas</p>
        {loading ?
          'Loading' :
          <AreaSelector
            areas={areas}
            selectedArea={selectedArea}
            selectArea={setSelectedArea}
          />
        }
      </div>
      <div className='fight-button'>
        {inspectedLocation ?
          (
            <>
              <div>Location : </div>
              <p>{inspectedLocation.name}</p>
              <div>Area : </div>
              <p>{selectedArea ? selectedArea.name : 'Choose area'}</p>
              <Link to={`/location/${selectedArea?.id}`} className={selectedArea && inspectedLocation ? 'go-button-active go-button' : 'go-button'}>
                <button
                  disabled={!selectedArea && inspectedLocation}
                  className={selectedArea && inspectedLocation ? 'go-button-active go-button' : 'go-button'}
                > GO </button>
              </Link>
            </>
          ) :
          (<p>Select a location</p>)}
      </div>
    </div>
  );
};

export default SelectLocationPage;
