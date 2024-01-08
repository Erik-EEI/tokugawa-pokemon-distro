const transformToTitleCase = (word) => {
  return `${word.split('').shift().toUpperCase()}${word.split('').splice(1).join('').toLowerCase()}`;
};

export default transformToTitleCase;
