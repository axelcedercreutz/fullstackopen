import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = React.forwardRef(({ blog, updateBlogs, username }) => {
  const [visible, setVisible] = useState(false);

  const handleAddLike = async () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    await blogService.update(blog.id, newBlog);
    updateBlogs();
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id);
      updateBlogs();
    }
  };

  const renderInfo = () => (
    <div>
      <p>{blog.url}</p>
      <div>
        {blog.likes}
        <button onClick={(e) => handleAddLike(e)}>like</button>
      </div>
      <p>{blog.user.name}</p>
      {blog.user.username === username && (
        <button onClick={(e) => handleDelete(e)}>Delete</button>
      )}
    </div>
  );
  return (
    <div style={{ border: "1px solid black", padding: "8px" }}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "view"}
      </button>
      {visible && renderInfo()}
    </div>
  );
});

Blog.propTypes = {
  username: PropTypes.string.isRequired,
};

Blog.displayName = "Blog";

export default Blog;
