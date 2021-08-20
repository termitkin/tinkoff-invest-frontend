import React from 'react';

import { header, header_draggable, heading } from './styles';

const OrderBook__header = ({ getInstrumentInfo }) => {
  let ticker;

  if (getInstrumentInfo.isLoaded) {
    ticker = getInstrumentInfo.fetchedData.ticker;
  }

  return (
    <header className={`${header} ${header_draggable}`}>
      <h2 className={heading}>Стакан {ticker}</h2>
    </header>
  );
};

export default OrderBook__header;
