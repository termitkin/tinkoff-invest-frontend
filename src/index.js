import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './components/App/App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './services/reducers/index';
import { socketMiddleware } from './services/middlewares/socketMiddleware';
import { composeWithDevTools } from 'redux-devtools-extension';

const storage = window.localStorage;
const TELEGRAM_BOT_TOKEN = JSON.parse(storage.getItem('TELEGRAM_BOT_TOKEN'));
const WS_URL = `wss://${window.location.host}/ws/${TELEGRAM_BOT_TOKEN}`;

const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(socketMiddleware(WS_URL), thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
