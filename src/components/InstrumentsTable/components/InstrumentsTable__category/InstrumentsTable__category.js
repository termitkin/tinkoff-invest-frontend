import React from 'react';
import InstrumentsTable__categoryHeader from '../InstrumentsTable__categoryHeader/InstrumentsTable__categoryHeader';
import InstrumentsTable__instrument from '../InstrumentsTable__instrument/InstrumentsTable__instrument';

const InstrumentsTable__category = React.memo(function ({ category, categoryName, type }) {
  return (
    <>
      {type === 'portfolio' && <InstrumentsTable__categoryHeader text={categoryName} quantity={category.length} />}

      {category.map((instrument) => (
        <InstrumentsTable__instrument {...instrument} type={type} key={instrument.ticker} />
      ))}
    </>
  );
});

export default InstrumentsTable__category;
