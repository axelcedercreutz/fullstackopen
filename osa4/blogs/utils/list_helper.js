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
  const newArray = _.groupBy(
    blogs.map((b) => b.author),
    "length"
  );
  console.log(newArray);
  return newArray;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
