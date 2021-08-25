import { combineReducers } from 'redux';
import connectionError from './connectionError';
import priceFromOrderBook from './priceFromOrderBook';
import currentInstrument from './currentInstrument';
import portfolio from './portfolio';
import wsData from './wsData';
import portfolioCurrenciesChanged from './portfolioCurrenciesChanged';
import orderPlaced from './orderPlaced';
import api from './api';

const rootReducer = combineReducers({
  connectionError,
  priceFromOrderBook,
  currentInstrument,
  portfolio,
  wsData,
  portfolioCurrenciesChanged,
  orderPlaced,
  api,
});

export default rootReducer;
