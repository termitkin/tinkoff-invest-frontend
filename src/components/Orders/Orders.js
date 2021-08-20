import React, { useEffect } from 'react';
import Orders__order from './components/Orders__order/Orders__order';
import fetchData from '../../services/actions/fetchData';
import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { header, header_draggable, heading, widget_size_s, widget__body, widget__empty } from './styles';
import Loader from '../Loader/Loader';
import dragElement from '../../utils/dragElement';

const selector = createSelector(
  (store) => store.api.getOrders,
  (store) => store.api.cancelOrder,
  (store) => store.orderPlaced,
  (fetchedOrders, fetchedCancelOrder, orderPlaced) => ({ fetchedOrders, fetchedCancelOrder, orderPlaced })
);

const canceledOrders = {};

let getOrdersLastCalled = null;

const Orders = () => {
  const { fetchedOrders, fetchedCancelOrder, orderPlaced } = useSelector(selector);
  const orders = fetchedOrders.fetchedData;

  let canceledOrderId;
  const canceledOrder = fetchedCancelOrder.fetchedData;

  const dispatch = useDispatch();

  const updateOrders = () => dispatch(fetchData('getOrders'));

  useEffect(() => {
    dragElement(document.querySelector('.ordersDraggable'), 'ordersDraggable');
  }, []);

  useEffect(() => {
    if (getOrdersLastCalled === null || Number(new Date()) - getOrdersLastCalled > 2000) {
      getOrdersLastCalled = Number(new Date());

      updateOrders();
    }
  }, [orderPlaced.orderId]);

  useEffect(() => {
    updateOrders();

    const interval = setInterval(updateOrders, 60000);
    return () => clearInterval(interval);
  }, []);

  if (typeof canceledOrder === 'string' && canceledOrder.startsWith('Заявка успешно отменена')) {
    canceledOrderId = canceledOrder.replace('Заявка успешно отменена: ', '');
    canceledOrders[canceledOrderId] = canceledOrderId;
  }

  return (
    <article className={`${widget_size_s} ordersDraggable`}>
      <header className={`${header} ${header_draggable}`}>
        <h2 className={heading}>Заявки</h2>
      </header>
      <div className={widget__body}>
        {fetchedOrders.isLoading && !orders.length ? (
          <Loader size="big" />
        ) : !Array.isArray(orders) ? (
          <div className={widget__empty}>{orders}</div>
        ) : (
          orders.map((item) => <Orders__order key={item.orderId} order={item} canceledOrders={canceledOrders} />)
        )}
      </div>
    </article>
  );
};

export default Orders;
