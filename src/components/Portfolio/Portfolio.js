import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchData from '../../services/actions/fetchData';
import { createSelector } from 'reselect';
import dragElement from '../../utils/dragElement';
import InstrumentsTable from '../InstrumentsTable/InstrumentsTable';
import { header, header_draggable, heading, widget__body, widget__empty, widget_size_l } from './styles';
import Loader from '../Loader/Loader';
import buildDataForRenderInTable from './utils/buildDataForRenderInTable';

const selector = createSelector(
  (store) => store.orderPlaced,
  (store) => store.api.getPortfolio,
  (orderPlaced, portfolio) => ({ orderPlaced, portfolio })
);

const Portfolio = () => {
  const dispatch = useDispatch();

  const { orderPlaced, portfolio } = useSelector(selector);
  const { fetchedData } = portfolio;

  const updatePortfolio = () => {
    !portfolio.isLoading && dispatch(fetchData('getPortfolio'));
  };

  useEffect(() => {
    dispatch({
      type: 'WS_CONNECTION_START',
    });
  }, []);

  useEffect(() => {
    dragElement(document.querySelector('.portfolioDraggable'), 'portfolioDraggable');
  }, []);

  useEffect(() => {
    updatePortfolio();

    const interval = setInterval(updatePortfolio, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updatePortfolio();
  }, [orderPlaced.orderId]);

  return (
    <article className={`${widget_size_l} portfolioDraggable`}>
      <header className={`${header} ${header_draggable}`}>
        <h2 className={heading}>Портфель</h2>
      </header>

      <div className={widget__body}>
        {fetchedData.instrumentsQuantity === 0 ? (
          <div className={widget__empty}>В портфеле ничего нет</div>
        ) : fetchedData.instrumentsQuantity > 0 ? (
          <InstrumentsTable {...buildDataForRenderInTable(fetchedData)} type="portfolio" />
        ) : (
          <Loader size="big" />
        )}
      </div>
    </article>
  );
};

export default Portfolio;
