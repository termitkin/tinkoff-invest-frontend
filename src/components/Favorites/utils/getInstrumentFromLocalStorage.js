const storage = window.localStorage;

const getInstrumentFromLocalStorage = () => {
  let instruments = JSON.parse(storage.getItem('favorites'));

  if (!instruments) {
    instruments = {};
    storage.setItem('favorites', JSON.stringify(instruments));
  }

  return instruments;
};

export default getInstrumentFromLocalStorage;
