import React from 'react';
import { subHeader } from './InstrumentsTable__categoryHeader.module.css';

const dic = {
  stocks: 'Акции',
  etfs: 'Фонды',
  currencies: 'Валюты',
  bonds: 'Облигации',
};

const InstrumentsTable__categoryHeader = React.memo(function ({ text, quantity }) {
  return (
    <tr className={subHeader}>
      <th scope="colGroup" colSpan="100">
        {dic[text]} ({quantity} шт)
      </th>
    </tr>
  );
});

export default InstrumentsTable__categoryHeader;
