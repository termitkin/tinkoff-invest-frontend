import React from 'react';
import PlaceOrder__sum from '../PlaceOrder__sum/PlaceOrder__sum';
import PlaceOrder__orderStatus from '../PlaceOrder__orderStatus/PlaceOrder__orderStatus';
import { placeOrder__footer } from './PlaceOrder__footer.module.css';

const PlaceOrder__footer = React.memo(function ({ getInstrumentInfo, state }) {
  let currencySign, quantityInOneLot, tradeStatus, instrumentType;

  if (getInstrumentInfo.isLoaded) {
    currencySign = getInstrumentInfo.fetchedData.currencySign;
    quantityInOneLot = getInstrumentInfo.fetchedData.quantityInOneLot;
    tradeStatus = getInstrumentInfo.fetchedData.tradeStatus;
    instrumentType = getInstrumentInfo.fetchedData.instrumentType;
  }

  return (
    <div className={placeOrder__footer}>
      <PlaceOrder__orderStatus />
      <PlaceOrder__sum
        instrumentType={instrumentType}
        quantityInOneLot={quantityInOneLot}
        currencySign={currencySign}
        tradeStatus={tradeStatus}
        state={state}
      />
    </div>
  );
});

export default PlaceOrder__footer;
