import { v4 as uuidv4 } from 'uuid';
import './AreaSelector.css';

const AreaSelector = ({ areas, selectedArea, selectArea }) => {
  const areaCard = (area) => {
    const engIndex = area.names.findIndex((elem) => elem.language.name === 'en');
    const properName = area.names[engIndex].name;

    return (
      <li key={uuidv4()}>
        <div
          className={selectedArea?.id === area.id ? 'area-option area-active' : 'area-base-option'}
          onClick={() => selectArea(area)}
        >
          <p>{properName}</p>
        </div>
      </li>
    );
  };

  return (
    <div className='area-selector-container'>
      <ul className='area-container'>
        {areas && areas.map((area) => areaCard(area))}
      </ul>
    </div>
  );

};

export default AreaSelector;
