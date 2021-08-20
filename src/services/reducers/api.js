const initialState = {
  getPortfolio: {
    isLoading: false,
    requestFailed: false,
    requestFailedMessage: '',
    fetchedData: {},
    dataType: 'getPortfolio',
  },
  getOrders: {
    isLoading: false,
    requestFailed: false,
    requestFailedMessage: '',
    fetchedData: [],
    dataType: 'getOrders',
  },
  cancelOrder: {
    isLoading: false,
    requestFailed: false,
    requestFailedMessage: '',
    fetchedData: {},
    dataType: 'cancelOrder',
  },
  getBalance: {
    isLoading: false,
    requestFailed: false,
    requestFailedMessage: '',
    fetchedData: '',
    dataType: 'getBalance',
  },
  getPortfolioCurrencies: {
    isLoading: false,
    requestFailed: false,
    requestFailedMessage: '',
    fetchedData: [],
    dataType: 'getPortfolioCurrencies',
  },
  getInstrumentInfo: {
    isLoading: false,
    isLoaded: false,
    requestFailed: false,
    requestFailedMessage: '',
    fetchedData: {},
    dataType: 'getInstrumentInfo',
  },
  placeLimitOrder: {
    isLoading: false,
    isLoaded: false,
    requestFailed: false,
    requestFailedMessage: '',
    fetchedData: {},
    dataType: 'placeLimitOrder',
  },
  placeMarketOrder: {
    isLoading: false,
    isLoaded: false,
    requestFailed: false,
    requestFailedMessage: '',
    fetchedData: {},
    dataType: 'placeMarketOrder',
  },
};

const api = (state = initialState, action) => {
  let { type, fetchedData, requestFailedMessage, dataType, localData, ok } = action;

  if (dataType === 'getInstrumentInfo') {
    fetchedData = { ...fetchedData, ...localData };
  }

  if (type === 'DATA_IS_LOADING') {
    return {
      ...state,
      [dataType]: {
        fetchedData: { ...state[dataType].fetchedData },
        isLoading: true,
        isLoaded: false,
        requestFailed: false,
        dataType,
        ok,
      },
    };
  } else if (type === 'SUCCESS_FETCH_DATA') {
    return {
      ...state,
      [dataType]: {
        dataType,
        fetchedData,
        isLoading: false,
        isLoaded: true,
        requestFailed: false,
        ok,
      },
    };
  } else if (type === 'FAILED_FETCH_DATA') {
    return {
      ...state,
      [dataType]: {
        requestFailed: true,
        isLoading: false,
        requestFailedMessage,
        dataType,
        ok,
      },
    };
  } else if (type === 'CLEAR_LIMIT_ORDER_FETCHED_DATA') {
    return {
      ...state,
      placeLimitOrder: {
        ...state.placeLimitOrder,
        fetchedData: {},
        ok: null,
      },
    };
  } else if (type === 'CLEAR_MARKET_ORDER_FETCHED_DATA') {
    return {
      ...state,
      placeMarketOrder: {
        ...state.placeMarketOrder,
        fetchedData: {},
        ok: null,
      },
    };
  } else {
    return state;
  }
};

export default api;
