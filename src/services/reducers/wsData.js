const initialState = {
  wsConnected: false,
};

const wsData = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === 'WS_CONNECTION_SUCCESS') {
    return { ...state, error: null, wsConnected: true };
  } else if (type === 'WS_CONNECTION_ERROR') {
    return { ...state, error: payload, wsConnected: false };
  } else if (type === 'WS_CONNECTION_CLOSED') {
    return { ...state, error: null, wsConnected: false };
  } else if (type === 'WS_GET_MESSAGE') {
    return { ...state, error: null, ...JSON.parse(payload) };
  } else {
    return state;
  }
};

export default wsData;
