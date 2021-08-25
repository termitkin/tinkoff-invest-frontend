import React from 'react';

const PlaceOrder__sum = React.memo(function ({ instrumentType, quantityInOneLot, currencySign, tradeStatus, state }) {
  const { price, quantity } = state;
  let sumToRender;

  if (instrumentType === 'Currency') {
    sumToRender = quantity * 1000 * price;
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
