import React from 'react';
import { useDispatch } from 'react-redux';

import {
  orderBook__order,
  orderBook__order_type_bids,
  orderBook__order_type_asks,
  orderBook__price,
  orderBook__quantity,
} from './OrderBook__order.module.css';

const OrderBook__order = React.memo(function ({ maxQuantity, type, order, decimalPlaces }) {
  const dispatch = useDispatch();
  const gradientPercent = (order[1] / maxQuantity) * 100;
  const gradientBgColor = type === 'ask' ? '#ff1745' : '#00a000';

  const handleOrderClick = (e) => {
    const price = Number.parseFloat(e.target.querySelector(`.${orderBook__price}`).textContent);

    dispatch({
      type: 'PRICE_FROM_ORDER_BOOK',
      payload: { price },
    });
  };

  return (
    <div
      onClick={handleOrderClick}
      style={{
        backgroundImage: `linear-gradient(to ${
          type === 'ask' ? 'right' : 'left'
        }, ${gradientBgColor} ${gradientPercent}%, transparent ${gradientPercent}% 100%)`,
      }}
      className={`${orderBook__order} ${type === 'ask' ? orderBook__order_type_asks : orderBook__order_type_bids}`}
    >
      <div aria-label="цена" className={orderBook__price}>
        {order[0].toFixed(decimalPlaces)}
      </div>
      <div aria-label="количество" className={orderBook__quantity}>
        {' '}
        {order[1]}
      </div>
    </div>
  );
});

export default OrderBook__order;
