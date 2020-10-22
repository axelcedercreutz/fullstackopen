import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  const renderBlogs = () =>
    blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </li>
      ));
  return renderBlogs();
};

export default BlogList;
