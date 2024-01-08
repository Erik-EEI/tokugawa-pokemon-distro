import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconLibrary } from 'config';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className={'loading-spinner-container'}>
      <FontAwesomeIcon icon={iconLibrary.faCircleSpinner} spin />
    </div>
  );
};

export default LoadingSpinner;
