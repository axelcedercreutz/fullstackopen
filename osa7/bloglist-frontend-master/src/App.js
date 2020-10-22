import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import Menu from "./components/Menu";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import { initializeBlogs, createBlog } from "./reducers/blogsReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { loginUser, setUser } from "./reducers/userReducer";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { Button, TextField, Typography } from "@material-ui/core";

const App = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const match = useRouteMatch("/blogs/:id");

  const matchUser = useRouteMatch("/users/:id");

  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  const singleUser = matchUser
    ? users.find((blog) => blog.id === matchUser.params.id)
    : null;

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(loggedUser));
    }
  }, []);

  const handleAddBlog = async (blog) => {
    dispatch(createBlog(blog));
    const message = `A new blog ${blog.title} by ${props.user.name} added`;
    dispatch(setNotification(message, "success", 5));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(
        loginUser({
          username,
          password,
        })
      );
      setUsername("");
      setPassword("");
    } catch (exception) {
      const message = "Wrong username or password";
      dispatch(setNotification(message, "error", 5));
    }
  };

  const renderLoginForm = () => (
    <form onSubmit={handleLogin}>
      <TextField
        id="username"
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
        variant={"outlined"}
        label={"username"}
      />
      <TextField
        id="password"
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
        variant={"outlined"}
        label={"password"}
      />
      <Button id="login-button" type="submit" variant={"outlined"}>
        login
      </Button>
    </form>
  );

  const renderLoggedInPage = () => (
    <div>
      <BlogList />
      <BlogForm handleAddBlog={(blog) => handleAddBlog(blog)} />
    </div>
  );

  return (
    <div>
      <Typography variant={"h2"}>blogs</Typography>
      {!user ? <h2>login</h2> : <Menu />}
      <Switch>
        <Route path="/users/:id">{<User user={singleUser} />}</Route>
        <Route path="/blogs/:id">{<Blog blog={blog} />}</Route>
        <Route path="/users">{!user ? renderLoginForm() : <UsersList />}</Route>
        <Route path="/">
          <Notification />
          {!user ? renderLoginForm() : renderLoggedInPage()}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
