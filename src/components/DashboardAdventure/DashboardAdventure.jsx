import { Link } from 'react-router-dom';
import {
  DashboardSectionTitle,
  GenericButton,
} from 'components';
import './DashboardAdventure.css';

const DashboardAdventure = () => {
  return (
    <>
      <DashboardSectionTitle sectionTitle={'Adventures'} />
      <div className={'dashboard-adventure-content'}>
        <p>Click on the button below if you are ready to start an Adventure!</p>
        <p>You will receive a random Pokemon encounter in the Location and Area of your choice that is on par with the high industry standards.</p>
        <p>You do not feel ready yet, you might consider reshuffling your Pokemon team or use the Marketplace.</p>
      </div>
      <Link to={'/location'}><GenericButton buttonText={'Start an Adventure!'} /></Link>
    </>
  );
};

export default DashboardAdventure;
