const mongoose = require("mongoose");
const supertest = require("supertest");
const jwt = require("jsonwebtoken");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

var token = "";

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const userObjects = helper.initalUsers.map((user) => new User(user));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
  const promiseArrayUser = userObjects.map((user) => user.save());
  await Promise.all(promiseArrayUser);
});

describe("when there is initially one user in db", () => {
  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test("creation fails with proper statuscode and message if too short username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "ro",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test("creation fails with proper statuscode and message if too short password", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "rorrr",
      name: "Superuser",
      password: "sn",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("password");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

describe("basic fetches blog", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there is 1 blog", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("the first note has id", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

describe("addition of a new blog", () => {
  test("succeeds with valid data", async () => {
    const usersAtStart = await helper.usersInDb();
    const newBlog = {
      title: "How to be awesome",
      author: "Bena",
      url: "bena.io",
      likes: 1000000,
      userId: usersAtStart[0].id,
    };
    const userForToken = {
      username: usersAtStart[0].username,
      id: usersAtStart[0].id,
    };
    const token = jwt.sign(userForToken, "testing123");
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((n) => n.title);
    expect(titles).toContain("How to be awesome");
  });
  test("succeeds even if blog is missing likes and adds likes to be 0", async () => {
    const usersAtStart = await helper.usersInDb();
    const newBlog = {
      title: "How to be awesome",
      author: "Bena",
      url: "bena.io",
      userId: usersAtStart[0].id,
    };
    const userForToken = {
      username: usersAtStart[0].username,
      id: usersAtStart[0].id,
    };
    const token = jwt.sign(userForToken, "testing123");
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const addedBlog = blogsAtEnd.find((n) => n.author === "Bena");
    expect(addedBlog.likes).toEqual(0);
  });
  test("blog without title is not added", async () => {
    const usersAtStart = await helper.usersInDb();
    const userForToken = {
      username: usersAtStart[0].username,
      id: usersAtStart[0].id,
    };
    const token = jwt.sign(userForToken, "testing123");
    const newBlog = {
      author: "Bena",
      url: "bena.io",
      likes: 1000000,
      userId: usersAtStart[0].id,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
  test("blog without url is not added", async () => {
    const usersAtStart = await helper.usersInDb();
    const newBlog = {
      title: "How to be awesome",
      author: "Bena",
      likes: 1000000,
      userId: usersAtStart[0].id,
    };
    const userForToken = {
      username: usersAtStart[0].username,
      id: usersAtStart[0].id,
    };
    const token = jwt.sign(userForToken, "testing123");
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
  test("blog without token is not added and 401 is returned", async () => {
    const usersAtStart = await helper.usersInDb();
    const newBlog = {
      title: "How to be awesome",
      author: "Bena",
      likes: 1000000,
      userId: usersAtStart[0].id,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe("delete a blog", () => {
  test("delete first blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    const userForToken = {
      username: "root",
      id: "123",
    };
    const token = jwt.sign(userForToken, "testing123");

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe("update a blog", () => {
  test("update first blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const usersAtStart = await helper.usersInDb();
    const blogToUpdate = {
      ...blogsAtStart[0],
      title: "How to be awesome",
      likes: 1000000,
    };

    const userForToken = {
      username: usersAtStart[0].username,
      id: usersAtStart[0].id,
    };
    const token = jwt.sign(userForToken, "testing123");

    await api
      .put(`/api/blogs/${blogsAtStart[0].id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(blogToUpdate)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).toContain("How to be awesome");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
