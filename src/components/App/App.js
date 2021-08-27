import Header from '../Header/Header';
import Portfolio from '../Portfolio/Portfolio';
import PlaceOrder from '../PlaceOrder/PlaceOrder';
import OrderBook from '../OrderBook/OrderBook';
import Orders from '../Orders/Orders';
import Favorites from '../Favorites/Favorites';
import Auth from '../Auth/Auth';
import ConnectionError from '../ConnectionError/ConnectionError';
import WithModal from '../../HOCS/withModal/withModal';
import { main } from './App.module.css';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const storage = window.localStorage;
const TELEGRAM_BOT_TOKEN = storage.getItem('TELEGRAM_BOT_TOKEN');

const selector = createSelector(
  (store) => store.connectionError,
  (connectionError) => connectionError
);

function App() {
  const { error } = useSelector(selector);

  return error ? (
    <WithModal Component={ConnectionError} type={'error'} />
  ) : !TELEGRAM_BOT_TOKEN ? (
    <WithModal Component={Auth} type={'auth'} />
  ) : (
    <>
      <Header />
      <main className={main}>
        <Portfolio />
        <PlaceOrder />
        <OrderBook />
        <Orders />
        <Favorites />
      </main>
    </>
  );
}

export default App;
