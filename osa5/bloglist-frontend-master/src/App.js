import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notificationType, setNotificationType] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    updateBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const updateBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotificationMessage("Wrong username or password");
      setNotificationType("error");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const handleAddBlog = async (event, blog) => {
    event.preventDefault();
    setNotificationMessage(`A new blog ${blog.title} by ${user.name} added`);
    setNotificationType("success");
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
    updateBlogs();
  };

  const renderUserInfo = () => (
    <div>
      <h3>{user.name + " logged in"}</h3>
      <button
        onClick={() => {
          window.localStorage.clear();
          setUser(null);
        }}
      >
        Logout
      </button>
    </div>
  );

  const renderLoginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const renderLoggedInPage = () => (
    <div>
      {renderUserInfo()}
      <BlogForm handleAddBlog={(e, blog) => handleAddBlog(e, blog)} />
      {renderBlogs()}
    </div>
  );

  const renderBlogs = () =>
    blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlogs={() => updateBlogs()}
          username={user.username}
        />
      ));

  return (
    <div>
      <h2>{user === null ? "login" : "blogs"}</h2>
      <Notification
        message={notificationMessage}
        notificationType={notificationType}
      />
      {user === null ? renderLoginForm() : renderLoggedInPage()}
    </div>
  );
};

export default App;
