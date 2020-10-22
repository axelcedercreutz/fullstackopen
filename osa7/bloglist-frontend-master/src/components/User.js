import React from "react";
import { Link } from "react-router-dom";

const User = (props) => {
  const user = props.user;
  if (!user) {
    return null;
  }

  const renderUser = () => (
    <>
      <h4>{user.name}</h4>
      <br />
      <h5>added blogs</h5>
      {user.blogs.map((blog) => (
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </li>
      ))}
    </>
  );

  return renderUser();
};

export default User;
