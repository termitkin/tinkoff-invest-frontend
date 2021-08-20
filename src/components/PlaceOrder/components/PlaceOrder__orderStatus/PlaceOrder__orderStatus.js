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

  return (
    (limitOrderPlaced !== 0 || marketOrderPlaced !== 0) && (
      <div className={placeLimitOrder.ok || placeMarketOrder.ok ? orderStatusSuccess : orderStatusFail}>
        {placeLimitOrder.ok || placeMarketOrder.ok ? 'Заявка успешно размещена' : 'Что-то пошло не так'}
      </div>
    )
  );
};

export default PlaceOrder__orderStatus;
