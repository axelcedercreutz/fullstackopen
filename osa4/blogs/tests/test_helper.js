const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Life of the lifter",
    author: "Axel Cedercreutz",
    url: "www.aced.fi",
    likes: 3,
    id: "1",
    userId: "123",
  },
];

const initalUsers = [
  {
    username: "root",
    name: "Master User",
    password: "secret",
    id: "123",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blogs) => blogs.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  initalUsers,
  blogsInDb,
  usersInDb,
};
