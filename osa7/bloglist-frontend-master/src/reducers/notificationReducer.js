let timerID;

export const setNotification = (content, type, time) => {
  return async (dispatch) => {
    dispatch(addNotification(content, type));
    clearTimeout(timerID);
    timerID = setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};

export const addNotification = (content, type) => {
  return {
    type: "ADD_NOTIFICATION",
    data: { message: content, type },
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION",
  };
};

const initialState = { message: "" };

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION": {
      return action.data;
    }
    case "CLEAR_NOTIFICATION": {
      return initialState;
    }
    default:
      return state;
  }
};

export default notificationReducer;
