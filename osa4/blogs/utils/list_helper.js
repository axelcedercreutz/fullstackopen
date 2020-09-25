var _ = require("lodash");
const blog = require("../models/blog");
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0 : blogs.reduce((x, y) => x + y.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }
  blogs.reduce((prev, curr) => (prev.likes >= curr.likes ? prev : curr), {});
  return blogs[0];
};

const mostBlogs = (blogs) => {
  const newArray = _(blogs)
    .groupBy((x) => x.author)
    .map((value, key) => ({ author: key, blogs: value.length }))
    .value();
  const mostBlogs = newArray.reduce((a, b) => (b.blogs > a.blogs ? b : a));
  return mostBlogs;
};

const mostLikes = (blogs) => {
  const newArray = _(blogs)
    .groupBy((x) => x.author)
    .map((value, key) => ({
      author: key,
      likes: value.reduce((a, b) => a + b.likes, 0),
    }))
    .value();
  const mostLikes = newArray.reduce((a, b) => (b.likes > a.likes ? b : a));
  return mostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
