import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { PlaceOrder__body, form, widget_size_m, widget__body, widget__empty } from './styles';
import dragElement from '../../utils/dragElement';
import PlaceOrder__header from './components/PlaceOrder__header/PlaceOrder__header';
import PlaceOrder__orderTypeSelector from './components/PlaceOrder__orderTypeSelector/PlaceOrder__orderTypeSelector';
import PlaceOrder__quantityAndPrice from './components/PlaceOrder__quantityAndPrice/PlaceOrder__quantityAndPrice';
import PlaceOrder__buttons from './components/PlaceOrder__buttons/PlaceOrder__buttons';
import PlaceOrder__footer from './components/PlaceOrder__footer/PlaceOrder__footer';
import fetchData from '../../services/actions/fetchData';
import Loader from '../Loader/Loader';

const selector = createSelector(
  (store) => store.priceFromOrderBook.price,
  (store) => store.portfolioCurrenciesChanged,
  (store) => store.api.getInstrumentInfo,
  (priceFromOrderBook, portfolioCurrencies, getInstrumentInfo) => ({
    priceFromOrderBook,
    portfolioCurrencies,
    getInstrumentInfo,
  })
);

const PlaceOrder = () => {
  const [state, setState] = useState({
    orderType: 'limit',
    price: 0,
    quantity: 0,
    sum: 0,
  });
  const { priceFromOrderBook, portfolioCurrencies, getInstrumentInfo } = useSelector(selector);
  const { orderType, price, quantity } = state;
  const { ticker, tradeStatus, lastPrice } = getInstrumentInfo.fetchedData;

  const dispatch = useDispatch();

  useEffect(() => {
    dragElement(document.querySelector('.placeOrderDraggable'), 'placeOrderDraggable');
  }, []);

  useEffect(() => {
    setState({ ...state, price: lastPrice || 0 });
  }, [lastPrice]);

  useEffect(() => {
    if (priceFromOrderBook) {
      setState({ ...state, price: priceFromOrderBook });
    }
  }, [priceFromOrderBook]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const ticker = getInstrumentInfo.fetchedData.ticker;
    const operationType = e.nativeEvent.submitter.value;

    if (orderType === 'limit') {
      dispatch(fetchData('placeLimitOrder', [ticker, quantity, operationType, price]));
    } else if (orderType === 'market') {
      dispatch(fetchData('placeMarketOrder', [ticker, quantity, operationType]));
    }
  };

  return (
    <article className={`${widget_size_m} placeOrderDraggable`}>
      <PlaceOrder__header getInstrumentInfo={getInstrumentInfo} />
      <div className={`${widget__body} ${PlaceOrder__body}`}>
        {(getInstrumentInfo.isLoading && <Loader size="big" />) ||
          ((!ticker || tradeStatus === 'NotAvailableForTrading') && (
            <div className={widget__empty}>
              {tradeStatus === 'NotAvailableForTrading'
                ? 'Торги этим инструментом приостановлены'
                : 'Инструмент не выбран'}
            </div>
          )) ||
          (getInstrumentInfo.isLoaded && (
            <form className={form} name="placeOrder" onSubmit={handleFormSubmit}>
              <PlaceOrder__orderTypeSelector getInstrumentInfo={getInstrumentInfo} state={state} setState={setState} />
              <PlaceOrder__quantityAndPrice getInstrumentInfo={getInstrumentInfo} state={state} setState={setState} />
              <PlaceOrder__buttons
                getInstrumentInfo={getInstrumentInfo}
                portfolioCurrencies={portfolioCurrencies}
                state={state}
              />
              <PlaceOrder__footer getInstrumentInfo={getInstrumentInfo} state={state} setState={setState} />
            </form>
          )) ||
          ''}
      </div>
    </article>
  );
};

export default PlaceOrder;
