import React from 'react';

const PlaceOrder__sum = React.memo(function ({ instrumentType, quantityInOneLot, currencySign, tradeStatus, state }) {
  const { orderType, price, quantity } = state;
  let sumToRender;

  if (instrumentType === 'Currency' && orderType === 'limit') {
    sumToRender = quantity * 1000 * price;
  } else if (instrumentType === 'Currency' && orderType === 'market') {
    sumToRender = quantity * price;
  } else {
    sumToRender = quantity * quantityInOneLot * price;
  }

  return (
    (tradeStatus === 'NormalTrading' && quantity && price && (
      <div>
        Стоимость {sumToRender.toFixed(2)} {currencySign} + комиссия
      </div>
    )) ||
    ''
  );
});

export default PlaceOrder__sum;
