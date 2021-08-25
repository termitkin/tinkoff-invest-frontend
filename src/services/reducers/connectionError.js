const initialState = {
  error: null,
};

const connectionError = (state = initialState, action) => {
  const { type } = action;

  if (type === 'CONNECTION_ERROR' || type === 'FAILED_FETCH_DATA') {
    return { error: true };
  } else {
    return state;
  }
};

export default connectionError;
