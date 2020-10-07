import anecdoteService from "../services/anecdotes";

export const giveVote = (updatedAnecdote) => {
  return async (dispatch) => {
    const updatedId = updatedAnecdote.id;
    const newVote = await anecdoteService.giveVote(updatedId, updatedAnecdote);
    dispatch({
      type: "VOTE",
      data: newVote,
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "ADD_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

const anecdoteReducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case "INIT_ANECDOTES":
      return action.data;
    case "VOTE": {
      return state.map((anecdote) =>
        anecdote.id !== action.data.id ? anecdote : action.data
      );
    }
    case "ADD_ANECDOTE":
      return [...state, action.data];
    default:
      return state;
  }
};

export default anecdoteReducer;
