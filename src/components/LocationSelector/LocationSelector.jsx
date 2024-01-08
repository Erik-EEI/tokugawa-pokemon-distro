import { v4 as uuidv4 } from 'uuid';
import './LocationSelector.css';

const LocationSelector = ({ locations, inspect, inspectedLocation }) => {
  const optionCard = (location) => {
    const engIndex = location.names.findIndex((elem) => elem.language.name === 'en');
    const properName = location.names[engIndex].name;

    return (
      <li key={uuidv4()} onClick={() => inspect(location)} >
        <div className={inspectedLocation?.id !== location.id ? 'location-option' : 'location-option loc-active'}>
          <p>{properName}</p>
        </div>
      </li>
    );
  };

  return (<div className='selector-container'>
    <ul className='location-container'>
      {locations.map((location, i) => optionCard(location, i))}
    </ul>
  </div>
  );
};

export default LocationSelector;
