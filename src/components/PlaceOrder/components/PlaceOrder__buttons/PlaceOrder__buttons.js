import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import Loader from '../../../Loader/Loader';
import { button, buttons, button_type_buy, button_type_sell } from './styles';

const selector = createSelector(
  (store) => store.api.placeLimitOrder,
  (store) => store.api.placeMarketOrder,
  (placeLimitOrder, placeMarketOrder) => ({
    placeLimitOrder,
    placeMarketOrder,
  })
);

const PlaceOrder__buttons = React.memo(function ({ getInstrumentInfo, portfolioCurrencies, state }) {
  const { placeLimitOrder, placeMarketOrder } = useSelector(selector);
  const { currency, ticker, tradeStatus, balance, lots, instrumentType } = getInstrumentInfo.fetchedData;

  const { orderType, price, quantity, sum } = state;
  const currentCurrency = portfolioCurrencies.find((curr) => curr.currency === currency);
  let availableCash = 0;

  if (currentCurrency) {
    if (currentCurrency.blocked) {
      availableCash = currentCurrency.balance - currentCurrency.blocked;
    } else {
      availableCash = currentCurrency.balance;
    }
  }

  let buyButtonDisabled = false;
  let sellButtonDisabled = false;

  if (!ticker || quantity === 0 || tradeStatus === 'NotAvailableForTrading' || (orderType === 'limit' && price === 0)) {
    buyButtonDisabled = true;
    sellButtonDisabled = true;
  }

  if (sum > availableCash) {
    buyButtonDisabled = true;
  }

  if (instrumentType === 'Currency' ? quantity > balance : quantity > lots) {
    sellButtonDisabled = true;
  }

  if (!balance && !lots) {
    sellButtonDisabled = true;
  }

  return (
    <div className={buttons}>
      <button disabled={buyButtonDisabled} type="submit" value="Buy" className={`${button} ${button_type_buy}`}>
        Покупка {(placeLimitOrder.isLoading || placeMarketOrder.isLoading) && <Loader size="small" />}
      </button>
      <button disabled={sellButtonDisabled} type="submit" value="Sell" className={`${button} ${button_type_sell}`}>
        Продажа {(placeLimitOrder.isLoading || placeMarketOrder.isLoading) && <Loader size="small" />}
      </button>
    </div>
  );
});

export default PlaceOrder__buttons;
