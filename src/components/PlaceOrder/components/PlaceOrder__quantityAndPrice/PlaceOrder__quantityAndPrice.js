import React from 'react';
import { fieldset, legend, label, labelText, input } from './styles';

const PlaceOrder__quantityAndPrice = ({ getInstrumentInfo, state, setState }) => {
  const { orderType, price, quantity } = state;
  const { ticker, minPriceIncrement, tradeStatus } = getInstrumentInfo.fetchedData;

  const handlePriceChange = (e) => {
    setState({ ...state, price: Number.parseFloat(e.target.value) });
  };

  const handleQuantityChange = (e) => {
    setState({ ...state, quantity: Number.parseInt(e.target.value, 10) });
  };

  return (
    <fieldset className={fieldset}>
      <legend className={legend}>Параметры</legend>
      <label className={label}>
        <span className={labelText}>Цена</span>
        <input
          className={input}
          value={price}
          name="orderPrice"
          type="number"
          step={minPriceIncrement}
          disabled={!ticker || tradeStatus !== 'NormalTrading' || orderType === 'market'}
          onChange={handlePriceChange}
        />
      </label>
      <label className={label}>
        <span className={labelText}>Лоты</span>
        <input
          className={input}
          min="0"
          value={quantity}
          name="orderQuantity"
          type="number"
          step="1"
          onChange={handleQuantityChange}
          disabled={!ticker || tradeStatus !== 'NormalTrading'}
        />
      </label>
    </fieldset>
  );
};

export default PlaceOrder__quantityAndPrice;
