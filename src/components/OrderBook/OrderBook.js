import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import dragElement from '../../utils/dragElement';
import OrderBook__header from './components/OrderBook__header/OrderBook__header';
import OrderBook__body from './components/OrderBook__body/OrderBook__body';
import { widget_size_s } from './styles';

const selector = createSelector(
  (store) => store.api.getInstrumentInfo,
  (store) => store.wsData,
  (getInstrumentInfo, wsData) => ({ getInstrumentInfo, wsData })
);
const OrderBook = () => {
  const { getInstrumentInfo, wsData } = useSelector(selector);

  useEffect(() => {
    dragElement(document.querySelector('.orderBookDraggable'), 'orderBookDraggable');
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    wsData.wsConnected &&
      dispatch({
        type: 'WS_SEND_MESSAGE',
        payload: {
          figi: getInstrumentInfo.fetchedData.figi,
        },
      });
  }, [getInstrumentInfo.fetchedData.figi]);

  return (
    <article className={`${widget_size_s} orderBookDraggable`}>
      <OrderBook__header getInstrumentInfo={getInstrumentInfo} />
      <OrderBook__body getInstrumentInfo={getInstrumentInfo} wsData={wsData} />
    </article>
  );
};

export default OrderBook;
