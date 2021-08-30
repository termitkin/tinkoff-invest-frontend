import React from 'react';
import removeInstrumentToLocalStorage from './removeInstrumentToLocalStorage';
import { button_type_close } from '../../../blocks/button/_type/button_type_close.module.css';
import { icon_type_close } from '../../../blocks/icon/_type/icon_type_close.module.css';

const buildDataForRenderInTable = ({ instruments, instrumentsQuantity }, setFavorites) => {
  const handleRemoveButtonClick = (e) => {
    const ticker = e.target.closest('tr').querySelector('th span').textContent;

    removeInstrumentToLocalStorage(ticker, setFavorites);
  };

  const data = [];

  data.columnHeadings = ['Тикер', 'Удалить'];
  data.instruments = {};
  data.instruments.stocks = instruments;
  data.instrumentsQuantity = instrumentsQuantity;

  for (const instrument in data.instruments.stocks) {
    instruments[instrument].dataForRender = [];
    instruments[instrument].dataForStore = {};
    instruments[instrument].type = 'favorites';

    instruments[instrument].dataForRender.push(
      <button className={button_type_close} onClick={handleRemoveButtonClick} title="Удалить инструмент из избранного">
        <svg className={icon_type_close} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path fill="none" d="M0 0h32v32H0z" />
          <path d="M2 26l4 4 10-10 10 10 4-4-10-10L30 6l-4-4-10 10L6 2 2 6l10 10z" />
        </svg>
      </button>
    );
  }

  return data;
};

export default buildDataForRenderInTable;
