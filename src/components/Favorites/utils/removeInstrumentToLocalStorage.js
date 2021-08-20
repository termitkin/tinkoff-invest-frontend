import getInstrumentFromLocalStorage from './getInstrumentFromLocalStorage';

const storage = window.localStorage;

const removeInstrumentToLocalStorage = (ticker, setFavorites) => {
  const { instruments } = getInstrumentFromLocalStorage();

  instruments.forEach((instrument, ind) => {
    if (instrument.ticker === ticker) {
      instruments.splice(ind, 1);
    }
  });

  const favorites = { instruments, instrumentsQuantity: instruments.length };

  storage.setItem('favorites', JSON.stringify(favorites));

  setFavorites(favorites);
};

export default removeInstrumentToLocalStorage;
