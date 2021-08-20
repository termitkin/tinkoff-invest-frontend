const initialState = {
  orderId: null,
};

const orderPlaced = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === 'ORDER_PLACED') {
    return { ...state, ...payload };
  } else {
    return state;
  }
};

export default orderPlaced;
