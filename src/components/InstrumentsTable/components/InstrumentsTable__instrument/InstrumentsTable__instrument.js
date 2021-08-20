import React from 'react';
import { useDispatch } from 'react-redux';
import {
  instrument,
  instrumentHeading,
  instrumentButton,
  instrumentTicker,
  instrumentFullName,
} from './InstrumentsTable__instrument.module.css';
import fetchData from '../../../../services/actions/fetchData';

const InstrumentsTable__instrument = ({ ticker, name, dataForRender, dataForStore, type }) => {
  const { currency, currencySign, lots, balance, figi, quantityInOneLot, instrumentType } = dataForStore;
  const dispatch = useDispatch();

  const handleTickerClick = async (e) => {
    if (type === 'favorites') {
      dispatch(fetchData('getInstrumentInfo', [ticker, 'ticker'], {}));
    } else if (type === 'portfolio') {
      dispatch(
        fetchData('getInstrumentInfo', [figi, 'figi'], {
          lots,
          ticker,
          name,
          quantityInOneLot,
          instrumentType,
          balance,
          currency,
          currencySign,
        })
      );

      dispatch({
        type: 'WS_SEND_MESSAGE',
        payload: {
          figi,
        },
      });
    }
  };

  return (
    <tr className={instrument}>
      <th scope="row" className={instrumentHeading}>
        <button onClick={handleTickerClick} className={instrumentButton} type="button">
          <span className={instrumentTicker}>{ticker}</span>
          <span className={instrumentFullName}>{name}</span>
        </button>
      </th>
      {dataForRender.map((item, id) => {
        return <td key={id}>{item}</td>;
      })}
    </tr>
  );
};

export default InstrumentsTable__instrument;
