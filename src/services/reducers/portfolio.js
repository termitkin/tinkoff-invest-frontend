const initialState = {
  instrumentsQuantity: 0,
  instruments: {},
};

const portfolio = (state = initialState, action) => {
  const { type } = action;

  if (type === 'PORTFOLIO') {
    return { ...state, ...action.payload };
  } else {
    return state;
  }
};

export default portfolio;
