const blogsRouter = require("express").Router();
const e = require("express");
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  if (!body.title || !body.url) {
    response.status(400).end();
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      likes: body.likes || 0,
      url: body.url,
    });
    const blogSaved = await blog.save();
    response.status(201).json(blogSaved);
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
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

module.exports = blogsRouter;
