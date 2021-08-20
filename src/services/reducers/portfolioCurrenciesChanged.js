const initialState = [];

const portfolioCurrenciesChanged = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === 'PORTFOLIO_CURRENCIES_CHANGED') {
    return payload;
  } else {
    return state;
  }
};

export default portfolioCurrenciesChanged;
