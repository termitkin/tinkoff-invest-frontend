import React from 'react';
import { fieldset, legend, label } from './PlaceOrder__orderTypeSelector.module.css';

const PlaceOrder__orderTypeSelector = React.memo(function ({ getInstrumentInfo, state, setState }) {
  const { orderType } = state;
  let ticker, tradeStatus;

  if (getInstrumentInfo.isLoaded) {
    ticker = getInstrumentInfo.fetchedData.ticker;
    tradeStatus = getInstrumentInfo.fetchedData.tradeStatus;
  }

  const handleOrderTypeClick = (e) => {
    setState({ ...state, orderType: e.target.value });
  };

  return (
    <fieldset className={fieldset}>
      <legend className={legend}>Тип заявки</legend>
      <label>
        <span className={label}>Лимитная</span>
        <input
          name="orderType"
          type="radio"
          value="limit"
          onChange={handleOrderTypeClick}
          checked={orderType === 'limit'}
          disabled={!ticker || tradeStatus !== 'NormalTrading'}
        />
      </label>
      <label>
        <span className={label}>Рыночная</span>
        <input
          name="orderType"
          type="radio"
          value="market"
          onChange={handleOrderTypeClick}
          checked={orderType === 'market'}
          disabled={!ticker || tradeStatus !== 'NormalTrading'}
        />
      </label>
    </fieldset>
  );
});

export default PlaceOrder__orderTypeSelector;
