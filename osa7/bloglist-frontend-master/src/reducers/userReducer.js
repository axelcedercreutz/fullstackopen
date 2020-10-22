import blogsService from "../services/blogs";
import loginService from "../services/login";

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    setUser(user);
    dispatch({
      type: "LOGIN",
      data: user,
    });
  };
};

export const setUser = (user) => {
  return async (dispatch) => {
    await blogsService.setToken(user.token);
    dispatch({
      type: "SET_USER",
      data: user,
    });
  };
};

export const clearUser = () => {
  return async (dispatch) => {
    await blogsService.setToken("");
    window.localStorage.clear();
    dispatch({
      type: "CLEAR_USER",
      data: null,
    });
  };
};

const userReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_USER":
      return action.data;
    case "CLEAR_USER":
      return action.data;
    case "LOGIN":
      return action.data;
    case "ADD_USER":
      return [...state, action.data];
    default:
      return state;
  }
};

export default userReducer;
