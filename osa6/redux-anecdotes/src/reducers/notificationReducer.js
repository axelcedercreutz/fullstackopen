let timerID;

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(addNotification(content));
    clearTimeout(timerID);
    timerID = setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};

export const addNotification = (content) => {
  return {
    type: "ADD_NOTIFICATION",
    data: content,
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION",
  };
};

const initialState = "";

const notificationReducer = (state = initialState, action) => {
  console.log(action);
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
