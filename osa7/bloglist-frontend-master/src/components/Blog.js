import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { updateBlog, deleteBlog, addComment } from "../reducers/blogsReducer";
import { useDispatch } from "react-redux";
import { Button, Input, TextField, Typography } from "@material-ui/core";

const Blog = React.forwardRef(({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [comment, setComment] = useState("");

  const handleUpdateBlog = async (blog) => {
    dispatch(updateBlog(blog));
  };

  const handleDeleteBlog = async (blog) => {
    dispatch(deleteBlog(blog.id));
  };

  const handleAddLike = async (event) => {
    event.preventDefault();
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    await handleUpdateBlog(newBlog);
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      await handleDeleteBlog(blog);
    }
  };

  const handleAddComment = async (event) => {
    event.preventDefault();
    dispatch(addComment(blog.id, comment));
    setComment("");
  };

  if (!blog) {
    return null;
  }

  const renderCommentForm = () => (
    <form onSubmit={handleAddComment}>
      <div>
        <TextField
          id="comment"
          type="text"
          value={comment}
          name="Comment"
          onChange={({ target }) => setComment(target.value)}
          variant={"outlined"}
        />
        <Button id="login-button" type="submit" variant={"outlined"}>
          add comment
        </Button>
      </div>
    </form>
  );

  const renderComments = () => (
    <div>
      <Typography variant={"h5"}>comments</Typography>
      {renderCommentForm()}
      {blog.comments &&
        blog.comments.map((comment) => (
          <Typography variant={"body1"}>{comment.comment}</Typography>
        ))}
    </div>
  );

  const renderInfo = () => (
    <div>
      <Typography variant={"h6"}>{blog.url}</Typography>
      <div>
        <Typography variant={"body1"}>{blog.likes}</Typography>
        <Button onClick={(e) => handleAddLike(e)} variant={"outlined"}>
          <Typography variant={"body1"}>like blog</Typography>
        </Button>
      </div>
      <p>{blog.user && blog.user.name}</p>
      {blog.user && blog.user.username === user.username && (
        <Button
          id={"delete-button"}
          onClick={() => handleDelete()}
          variant={"outlined"}
        >
          <Typography variant={"body1"}>Delete</Typography>
        </Button>
      )}
    </div>
  );
  return (
    <div>
      <Typography variant={"h4"}>
        {blog.title} {blog.author}
      </Typography>
      {renderInfo()}
      {renderComments()}
    </div>
  );
});

Blog.propTypes = {
  username: PropTypes.string.isRequired,
};

Blog.displayName = "Blog";

export default Blog;
