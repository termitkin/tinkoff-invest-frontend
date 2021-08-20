import Header from '../Header/Header';
import Portfolio from '../Portfolio/Portfolio';
import PlaceOrder from '../PlaceOrder/PlaceOrder';
import OrderBook from '../OrderBook/OrderBook';
import Orders from '../Orders/Orders';
import Favorites from '../Favorites/Favorites';
import Registration from '../Registration/Registration';
import { main } from './App.module.css';

const storage = window.localStorage;
const TELEGRAM_BOT_TOKEN = storage.getItem('TELEGRAM_BOT_TOKEN');

function App() {
  return TELEGRAM_BOT_TOKEN ? (
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
  ) : (
    <Registration />
  );
}

export default App;
