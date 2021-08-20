import React from 'react';
import { header, header_draggable, heading } from './styles';

const PlaceOrder__header = React.memo(function ({ getInstrumentInfo }) {
  return (
    <header className={`${header} ${header_draggable}`}>
      <h2 className={heading}>
        Разместить заявку {getInstrumentInfo.isLoaded && getInstrumentInfo.fetchedData.ticker}
      </h2>
    </header>
  );
});

export default PlaceOrder__header;
