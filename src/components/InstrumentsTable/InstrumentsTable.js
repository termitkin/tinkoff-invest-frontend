import React from 'react';
import { table, thead } from './styles';

import InstrumentsTable__category from './components/InstrumentsTable__category/InstrumentsTable__category';

const InstrumentsTable = ({ columnHeadings, instruments, instrumentsQuantity, type }) => {
  return (
    <table className={table}>
      <thead className={thead}>
        <tr>
          {columnHeadings.map((heading) => (
            <th key={heading} scope="col">
              {heading}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {Object.keys(instruments).map((category) => {
          return (
            <InstrumentsTable__category
              key={category}
              category={instruments[category]}
              categoryName={category}
              type={type}
            />
          );
        })}
      </tbody>

      <tfoot className={thead}>
        <tr>
          <td colSpan="100">Всего бумаг: {instrumentsQuantity}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default InstrumentsTable;
