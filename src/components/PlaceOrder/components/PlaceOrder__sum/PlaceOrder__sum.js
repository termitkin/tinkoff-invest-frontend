import React, { useEffect } from 'react';

const PlaceOrder__sum = ({ instrumentType, quantityInOneLot, currencySign, tradeStatus, state, setState }) => {
  const { price, quantity } = state;
  let sumToRender;

  if (instrumentType === 'Currency') {
    sumToRender = quantity * 1000 * price;
  } else {
    sumToRender = quantity * quantityInOneLot * price;
  }

  useEffect(() => {
    setState({ ...state, sum: sumToRender });
  }, [sumToRender]);

  return (
    (tradeStatus === 'NormalTrading' && quantity && price && (
      <div>
        Стоимость {sumToRender.toFixed(2)} {currencySign} + комиссия
      </div>
    )) ||
    ''
  );
};

export default PlaceOrder__sum;
