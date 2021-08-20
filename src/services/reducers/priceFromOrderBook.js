const initialState = {
  price: null,
};

const priceFromOrderBook = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === 'PRICE_FROM_ORDER_BOOK') {
    return { ...state, ...payload };
  } else {
    return state;
  }
};

export default priceFromOrderBook;
