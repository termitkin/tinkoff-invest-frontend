const initialState = {
  name: null,
  ticker: null,
};

const currentInstrument = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === 'CURRENT_INSTRUMENT') {
    return { ...state, ...payload };
  } else {
    return state;
  }
};

export default currentInstrument;
