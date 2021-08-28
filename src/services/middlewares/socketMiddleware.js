let lastReconnection = null;

export const socketMiddleware = (wsUrl) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;

      const handleSocketOpen = (e) => {
        dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: e });
      };

      const handleSocketClose = (e) => {
        dispatch({ type: 'WS_CONNECTION_CLOSED', payload: e });

        if (lastReconnection === null || Number(new Date()) - lastReconnection > 5000) {
          lastReconnection = Number(new Date());
          socket = new WebSocket(wsUrl);
        } else {
          dispatch({ type: 'CONNECTION_ERROR' });
        }
      };

      const handleSocketMessage = (e) => {
        dispatch({ type: 'WS_GET_MESSAGE', payload: e.data });
      };

      const handleSocketError = (e) => {
        dispatch({ type: 'WS_CONNECTION_ERROR', payload: e });
        dispatch({ type: 'CONNECTION_ERROR' });
      };

      if (type === 'WS_CONNECTION_START') {
        socket = new WebSocket(wsUrl);
      }

      if (socket) {
        socket.onopen = handleSocketOpen;
        socket.onclose = handleSocketClose;
        socket.onmessage = handleSocketMessage;
        socket.onerror = handleSocketError;

        if (type === 'WS_SEND_MESSAGE') {
          socket.send(JSON.stringify(payload));
        }
      }

      next(action);
    };
  };
};
