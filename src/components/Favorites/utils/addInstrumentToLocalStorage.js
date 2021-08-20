import getInstrumentFromLocalStorage from './getInstrumentFromLocalStorage';

const storage = window.localStorage;

const addInstrumentToLocalStorage = (ticker) => {
  const favorites = getInstrumentFromLocalStorage();

  if (!Array.isArray(favorites.instruments)) {
    favorites.instruments = [];
  }

  if (!favorites.instruments.find((instrument) => instrument.ticker === ticker)) {
    favorites.instruments.push({ ticker: ticker, name: ticker });
  }

  favorites.instrumentsQuantity = favorites.instruments.length;

  storage.setItem('favorites', JSON.stringify(favorites));
};

export default addInstrumentToLocalStorage;
