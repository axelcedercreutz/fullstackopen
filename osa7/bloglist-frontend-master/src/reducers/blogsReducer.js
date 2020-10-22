import blogsService from "../services/blogs";

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(content);
    dispatch({
      type: "ADD_BLOG",
      data: newBlog,
    });
  };
};

export const updateBlog = (content) => {
  return async (dispatch) => {
    const updatedId = content.id;
    const newBlog = await blogsService.update(updatedId, content);
    dispatch({
      type: "UPDATE_BLOG",
      data: newBlog,
    });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const newBlogs = await blogsService.deleteBlog(id);
    dispatch({
      type: "DELETE_BLOG",
      data: id,
    });
  };
};

export const addComment = (id, content) => {
  return async (dispatch) => {
    const newComment = await blogsService.addComment(id, content);
    console.log(newComment);
    dispatch({
      type: "ADD_COMMENT",
      data: newComment,
    });
  };
};

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "UPDATE_BLOG": {
      return state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      );
    }
    case "ADD_BLOG":
      return [...state, action.data];
    case "DELETE_BLOG":
      return state.filter((blog) => blog.id !== action.data);
    case "ADD_COMMENT":
      const newBlog = state.find((blog) => blog.id == action.data.blog);
      const updatedBlogComments = newBlog.comments.concat(action.data);
      const updatedBlog = {
        ...newBlog,
        comments: updatedBlogComments,
      };
      const updatedBlogs = state.map((blog) =>
        blog.id !== action.data.blog ? blog : updatedBlog
      );
      return updatedBlogs;
    default:
      return state;
  }
};

export default blogsReducer;
