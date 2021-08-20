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
        const { ok, data } = JSON.parse(res);

        if (ok) {
          dispatch({
            type: 'SUCCESS_FETCH_DATA',
            dataType,
            fetchedData: data,
            localData,
            ok,
          });
          return;
        }

        dispatch({
          type: 'FAILED_FETCH_DATA',
          requestFailedMessage: data.text,
          fetchedData: {},
          dataType,
          ok,
        });
      })
      .catch(() => {
        dispatch({
          type: 'FAILED_FETCH_DATA',
          requestFailedMessage: 'На сервере что-то пошло не так',
          fetchedData: {},
          dataType,
          ok: false,
        });
      });
  };
};

export default fetchData;
