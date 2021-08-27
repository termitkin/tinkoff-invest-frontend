import React from 'react';
import { useDispatch } from 'react-redux';
import fetchData from '../../../../services/actions/fetchData';
import { button_type_close } from '../../../../blocks/button/_type/button_type_close.module.css';
import { icon_type_close } from '../../../../blocks/icon/_type/icon_type_close.module.css';
import {
  orderClass,
  orderBody,
  orderHeading,
  orderHeadingBuy,
  orderHeadingSell,
  instrumentName,
} from './Orders__order.module.css';
import dic from './utils/dic';

let getOrdersLastCalled = null;

const Orders__order = ({ order, canceledOrders }) => {
  const { orderId, operation, ticker, name, requestedLots, executedLots, price, lot, priceTotal, currencySign } = order;
  const dispatch = useDispatch();

  const handleCancelOrderButtonClick = (orderId) => {
    dispatch(fetchData('cancelOrder', [orderId]));

    if (getOrdersLastCalled === null || Number(new Date()) - getOrdersLastCalled > 5000) {
      getOrdersLastCalled = Number(new Date());

      setTimeout(() => {
        dispatch(fetchData('getOrders'));
        dispatch(fetchData('getPortfolioCurrencies'));
      }, 4000);
    }
  };

  return (
    <div className={orderClass} key={orderId}>
      <div className={`${orderHeading} ${operation === 'Buy' ? orderHeadingBuy : orderHeadingSell}`}>
        <span>{dic[[operation]]}: </span>
        <span>{ticker}</span>
        <span className={instrumentName}>({name})</span>
        {!canceledOrders.hasOwnProperty(orderId) && (
          <button
            onClick={() => handleCancelOrderButtonClick(orderId)}
            className={button_type_close}
            type="button"
            title="Отменить заявку"
          >
            <svg className={icon_type_close} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" d="M0 0h32v32H0z" />
              <path d="M2 26l4 4 10-10 10 10 4-4-10-10L30 6l-4-4-10 10L6 2 2 6l10 10z" />
            </svg>
          </button>
        )}
      </div>

      <div className={orderBody}>
        {(!canceledOrders.hasOwnProperty(orderId) && (
          <>
            {dic.requestedLots}: {requestedLots} шт
            <br />
            {dic.executedLots}: {executedLots} шт
            <br />
            <br />
            {dic.price}: {price} {currencySign}
            <br />
            {dic.lot}: {lot} шт
            <br />
            {dic.priceTotal}: {priceTotal.toFixed(2)} {currencySign}
          </>
        )) ||
          'Заявка успешно отменена'}
      </div>
    </div>
  );
};

export default Orders__order;
