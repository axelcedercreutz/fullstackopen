const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { comment: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes || 0,
    url: body.url,
    user: user._id,
  });
  const blogSaved = await blog.save();
  user.blogs = user.blogs.concat(blogSaved._id);
  await user.save();
  response.status(201).json(blogSaved);
});

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(request.params.id);
  if (user._id.toString() === blog.user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    response.status(401).json({
      error:
        "not same person trying to delete the blog as the person who created it",
    });
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url,
  };

  const blogSaved = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(blogSaved);
});

blogsRouter.post("/:id/comments", async (request, response, next) => {
  const body = request.body;
  const comment = new Comment({
    comment: body.comment,
    blog: body.blogId,
  });
  const blog = await Blog.findById(body.blogId);
  const commentSaved = await comment.save();
  console.log(commentSaved);
  blog.comments = blog.comments.concat(commentSaved._id);
  await blog.save();
  response.status(201).json(commentSaved);
});

module.exports = blogsRouter;
