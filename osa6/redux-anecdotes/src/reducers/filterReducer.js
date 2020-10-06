export const addFilter = (filter) => {
  return {
    type: "ADD_FILTER",
    data: filter,
  };
};

const initialState = "";

const filterReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_FILTER": {
      return action.data;
    }
    case "CLEAR_FILTER": {
      return initialState;
    }
    default:
      return state;
  }
};

export default filterReducer;
