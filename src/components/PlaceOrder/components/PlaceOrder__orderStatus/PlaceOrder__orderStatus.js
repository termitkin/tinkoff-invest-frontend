import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { orderStatusSuccess, orderStatusFail } from './PlaceOrder__orderStatus.module.css';

const selector = createSelector(
  (store) => store.api.placeLimitOrder,
  (store) => store.api.placeMarketOrder,
  (placeLimitOrder, placeMarketOrder) => ({
    placeLimitOrder,
    placeMarketOrder,
  })
);

const PlaceOrder__orderStatus = () => {
  const { placeLimitOrder, placeMarketOrder } = useSelector(selector);

  const limitOrderPlaced = Object.keys(placeLimitOrder.fetchedData).length;
  const marketOrderPlaced = Object.keys(placeMarketOrder.fetchedData).length;

  const dispatch = useDispatch();

  useEffect(() => {
    if (limitOrderPlaced || marketOrderPlaced) {
      setTimeout(() => {
        dispatch({
          type: 'ORDER_PLACED',
          payload: { orderId: placeLimitOrder.fetchedData.orderId || placeMarketOrder.fetchedData.orderId },
        });
      }, 500);

      const timeout = setTimeout(() => {
        limitOrderPlaced && dispatch({ type: 'CLEAR_LIMIT_ORDER_FETCHED_DATA' });
        marketOrderPlaced && dispatch({ type: 'CLEAR_MARKET_ORDER_FETCHED_DATA' });
      }, 4000);

      if (limitOrderPlaced && placeLimitOrder.isLoading) {
        clearTimeout(timeout);
        dispatch({ type: 'CLEAR_LIMIT_ORDER_FETCHED_DATA' });
      }
      if (marketOrderPlaced && placeMarketOrder.isLoading) {
        clearTimeout(timeout);
        dispatch({ type: 'CLEAR_MARKET_ORDER_FETCHED_DATA' });
      }
    }
  }, [limitOrderPlaced, marketOrderPlaced, placeLimitOrder, placeMarketOrder]);

  let resolve = true;
  let statusMessage;

  if (
    placeLimitOrder.fetchedData.status === 'Rejected' ||
    placeMarketOrder.fetchedData.status === 'Rejected' ||
    (!placeLimitOrder.ok && !placeMarketOrder.ok) ||
    placeLimitOrder.error ||
    placeMarketOrder.error
  ) {
    resolve = false;
  }

  if (placeLimitOrder.fetchedData.status === 'Rejected') {
    statusMessage = placeLimitOrder.fetchedData.message;
  } else if (placeMarketOrder.fetchedData.status === 'Rejected') {
    statusMessage = placeMarketOrder.fetchedData.message;
  } else if (placeLimitOrder.error) {
    statusMessage = placeLimitOrder.fetchedData;
  } else if (placeMarketOrder.error) {
    statusMessage = placeMarketOrder.fetchedData;
  } else if (!placeLimitOrder.ok && !placeMarketOrder.ok) {
    statusMessage = 'Что-то пошло не так';
  } else if (placeLimitOrder.fetchedData.status === 'Fill' || placeMarketOrder.fetchedData.status === 'Fill') {
    statusMessage = 'Заявка исполнена';
  } else {
    statusMessage = 'Заявка успешно размещена';
  }

  return (
    (limitOrderPlaced !== 0 || marketOrderPlaced !== 0) && (
      <div className={resolve ? orderStatusSuccess : orderStatusFail}>{statusMessage}</div>
    )
  );
};

export default PlaceOrder__orderStatus;
