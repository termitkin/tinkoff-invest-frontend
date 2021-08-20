import React from 'react';
import {
  defaultColor,
  loss,
  profit,
} from '../../InstrumentsTable/components/InstrumentsTable__category/InstrumentsTable__category.module.css';

const buildDataForRenderInTable = (fetchedData) => {
  const data = {};

  data.instrumentsQuantity = fetchedData.instrumentsQuantity;
  data.columnHeadings = ['Тикер', 'Лотов', 'Штук', 'Средняя', 'Блок', 'Доход'];
  data.instruments = {};
  data.type = 'portfolio';

  for (const instrumentsCategory in fetchedData) {
    if (typeof fetchedData[instrumentsCategory] === 'object') {
      data.instruments[instrumentsCategory] = [];

      for (const instrument of fetchedData[instrumentsCategory]) {
        const { lots, balance, averagePositionPriceValue, currencySign, blocked, expectedYieldValue } = instrument;
        const dataForRender = [];

        dataForRender.push(lots);
        dataForRender.push(balance);
        dataForRender.push(`${averagePositionPriceValue} ${currencySign}`);
        dataForRender.push(blocked || 0);
        dataForRender.push(
          <span className={expectedYieldValue === 0 ? defaultColor : expectedYieldValue > 0 ? profit : loss}>
            {expectedYieldValue} {currencySign}
          </span>
        );

        data.instruments[instrumentsCategory].push({
          ticker: instrument.ticker,
          name: instrument.name,
          dataForRender,
          dataForStore: { ...instrument },
        });
      }
    }
  }

  return data;
};

export default buildDataForRenderInTable;
