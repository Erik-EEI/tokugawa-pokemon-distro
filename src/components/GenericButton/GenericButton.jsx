import './GenericButton.css';

const GenericButton = ({ buttonText, onClick, disabled, pokeId, activeClass = '' }) => {
  return (
    <button
      type={'button'}
      className={`generic-button ${activeClass}`}
      onClick={onClick}
      disabled={disabled}
      data-pokeid={pokeId}
    >
      {buttonText}
    </button>
  );
};

export default GenericButton;
