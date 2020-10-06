import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = React.forwardRef(({ blog, updateBlog, deleteBlog, username }) => {
  const [visible, setVisible] = useState(false);

  const handleAddLike = async (event) => {
    event.preventDefault();
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    await updateBlog(newBlog);
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      await deleteBlog(blog);
    }
  };

  const renderInfo = () => (
    <div>
      <p>{blog.url}</p>
      <div>
        {blog.likes}
        <button onClick={(e) => handleAddLike(e)}>like blog</button>
      </div>
      <p>{blog.user && blog.user.name}</p>
      {blog.user && blog.user.username === username && (
        <button id={"delete-button"} onClick={() => handleDelete()}>
          Delete
        </button>
      )}
    </div>
  );
  return (
    <div style={{ border: "1px solid black", padding: "8px" }}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)} className={"showBlogInfo"}>
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
