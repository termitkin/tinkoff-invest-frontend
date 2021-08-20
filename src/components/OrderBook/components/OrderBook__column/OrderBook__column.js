import React from 'react';
import OrderBook__order from '../OrderBook__order/OrderBook__order';
import { orderBook__columnHeading, orderBook__columnHeading_type_asks } from './OrderBook__column.module.css';

const OrderBook__column = React.memo(function ({ type, orders, maxQuantity, decimalPlaces, currencySign }) {
  return (
    <div>
      <h3 className={`${orderBook__columnHeading} ${type === 'asks' && orderBook__columnHeading_type_asks}`}>
        {type === 'bids' ? 'Bid' : 'Ask'}, {currencySign}
      </h3>
      <div>
        {orders.map((order, ind) => (
          <OrderBook__order
            maxQuantity={maxQuantity}
            type={type === 'bids' ? 'bid' : 'ask'}
            order={order}
            ind={ind}
            decimalPlaces={decimalPlaces}
            key={ind}
          />
        ))}
      </div>
    </div>
  );
});

export default OrderBook__column;
