const storage = window.localStorage;
const TELEGRAM_BOT_TOKEN = JSON.parse(storage.getItem('TELEGRAM_BOT_TOKEN'));
const API_URL = `/api/${TELEGRAM_BOT_TOKEN}`;

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: TELEGRAM_BOT_TOKEN,
  },
};

const fetchData = (dataType, params, localData) => {
  return (dispatch) => {
    dispatch({
      type: 'DATA_IS_LOADING',
      fetchedData: {},
      localData,
      dataType,
    });

    fetch(API_URL, {
      ...options,
      body: JSON.stringify({ myData: `/${dataType} ${params && params.join(' ')}` }),
    })
      .then((res) => res.json())
      .then((res) => {
        const { ok, error, data } = JSON.parse(res);

        if (error) {
          dispatch({
            type: 'SUCCESS_FETCH_DATA',
            dataType,
            error,
            fetchedData: data.text,
            localData,
            ok,
          });
        } else if (ok) {
          dispatch({
            type: 'SUCCESS_FETCH_DATA',
            dataType,
            fetchedData: data,
            localData,
            ok,
          });
        } else {
          dispatch({
            type: 'FAILED_FETCH_DATA',
          });
        }
      })
      .catch(() => {
        dispatch({
          type: 'CONNECTION_ERROR',
        });
      });
  };
};

export default fetchData;
