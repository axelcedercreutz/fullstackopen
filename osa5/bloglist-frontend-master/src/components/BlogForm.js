import React, { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [visible, setVisible] = useState(false);

  const handleAddBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    await blogService.create(newBlog);
    setTitle("");
    setAuthor("");
    setUrl("");
    setVisible(!visible);
    props.handleAddBlog(event, newBlog);
  };

  const renderAddBlog = () => (
    <form onSubmit={(e) => handleAddBlog(e)}>
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
      <button onClick={() => setVisible(!visible)}>Cancel</button>
    </form>
  );

  return visible ? (
    renderAddBlog()
  ) : (
    <button onClick={() => setVisible(!visible)}>Add blog</button>
  );
};

export default BlogForm;
