const initialState = {
  getPortfolio: {
    isLoading: false,
    requestFailed: false,
    fetchedData: {},
    dataType: 'getPortfolio',
  },
  getOrders: {
    isLoading: false,
    requestFailed: false,
    fetchedData: [],
    dataType: 'getOrders',
  },
  cancelOrder: {
    isLoading: false,
    requestFailed: false,
    fetchedData: {},
    dataType: 'cancelOrder',
  },
  getBalance: {
    isLoading: false,
    requestFailed: false,
    fetchedData: '',
    dataType: 'getBalance',
  },
  getPortfolioCurrencies: {
    isLoading: false,
    requestFailed: false,
    fetchedData: [],
    dataType: 'getPortfolioCurrencies',
  },
  getInstrumentInfo: {
    isLoading: false,
    isLoaded: false,
    requestFailed: false,
    fetchedData: {},
    dataType: 'getInstrumentInfo',
  },
  placeLimitOrder: {
    isLoading: false,
    isLoaded: false,
    requestFailed: false,
    fetchedData: {},
    dataType: 'placeLimitOrder',
  },
  placeMarketOrder: {
    isLoading: false,
    isLoaded: false,
    requestFailed: false,
    fetchedData: {},
    dataType: 'placeMarketOrder',
  },
};

const api = (state = initialState, action) => {
  let { type, error, fetchedData, dataType, localData, ok } = action;

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
    if (dataType === 'getInstrumentInfo') {
      fetchedData = { ...fetchedData, ...localData };
    }

    return {
      ...state,
      [dataType]: {
        error,
        dataType,
        fetchedData,
        isLoading: false,
        isLoaded: true,
        requestFailed: false,
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
