const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Life of the lifter",
    author: "Axel Cedercreutz",
    url: "www.aced.fi",
    likes: 3,
    id: "1",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blogs) => blogs.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
