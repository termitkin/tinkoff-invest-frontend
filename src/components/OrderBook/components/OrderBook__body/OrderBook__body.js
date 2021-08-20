import React from 'react';
import OrderBook__column from '../OrderBook__column/OrderBook__column';
import { widget__body, widget__empty, orderBook__columns } from './styles';
import Loader from '../../../Loader/Loader';
import getMaxQuantity from './utils/getMaxQuantity';

const OrderBook__body = ({ wsData, getInstrumentInfo }) => {
  const { asks, bids } = wsData;
  const { tradeStatus, decimalPlaces } = getInstrumentInfo.fetchedData;
  const { currencySign, ticker } = getInstrumentInfo.fetchedData;
  const maxQuantity = getMaxQuantity(asks, bids);

  return (
    <div className={`${widget__body} ${orderBook__columns}`}>
      {(getInstrumentInfo.isLoading && <Loader size="big" />) ||
        ((!ticker || tradeStatus === 'NotAvailableForTrading') && (
          <div className={widget__empty}>
            {tradeStatus === 'NotAvailableForTrading'
              ? 'Торги этим инструментом приостановлены'
              : 'Инструмент не выбран'}
          </div>
        )) ||
        (tradeStatus === 'NormalTrading' && asks && bids && (
          <>
            <OrderBook__column
              type="bids"
              orders={bids}
              maxQuantity={maxQuantity}
              decimalPlaces={decimalPlaces}
              currencySign={currencySign}
            />
            <OrderBook__column
              type="asks"
              orders={asks}
              maxQuantity={maxQuantity}
              decimalPlaces={decimalPlaces}
              currencySign={currencySign}
            />
          </>
        ))}
    </div>
  );
};

export default OrderBook__body;
