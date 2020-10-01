import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState(null);
  const [notificationType, setNotificationType] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

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

  const handleAddBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    await blogService.create(newBlog);
    setNotificationMessage(`A new blog ${title} by ${user.name} added`);
    setNotificationType("success");
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
    setTitle("");
    setAuthor("");
    setUrl("");
    blogService.getAll().then((blogs) => setBlogs(blogs));
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

  const renderAddBlog = () => (
    <form onSubmit={handleAddBlog}>
      <div>
        title
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
          required
        />
      </div>
      <div>
        Author
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );

  const renderLoggedInPage = () => (
    <div>
      {renderUserInfo()}
      {renderAddBlog()}
      {renderBlogs()}
    </div>
  );

  const renderBlogs = () =>
    blogs.map((blog) => <Blog key={blog.id} blog={blog} />);

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
