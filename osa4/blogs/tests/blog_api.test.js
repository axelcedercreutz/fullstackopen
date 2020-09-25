const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
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
    const newBlog = {
      title: "How to be awesome",
      author: "Bena",
      url: "bena.io",
      likes: 1000000,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((n) => n.title);
    expect(titles).toContain("How to be awesome");
  });
  test("succeeds even if blog is missing likes and adds likes to be 0", async () => {
    const newBlog = {
      title: "How to be awesome",
      author: "Bena",
      url: "bena.io",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const addedBlog = blogsAtEnd.find((n) => n.author === "Bena");
    expect(addedBlog.likes).toEqual(0);
  });
  test("blog without title is not added", async () => {
    const newBlog = {
      author: "Bena",
      url: "bena.io",
      likes: 1000000,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
  test("blog without url is not added", async () => {
    const newBlog = {
      title: "How to be awesome",
      author: "Bena",
      likes: 1000000,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe("delete a blog", () => {
  test("delete first blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe("update a blog", () => {
  test("update first blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = {
      author: blogsAtStart[0].author,
      title: "How to be awesome",
      url: blogsAtStart[0].url,
      likes: 1000000,
      id: blogsAtStart[0].id,
    };

    await api
      .put(`/api/blogs/${blogsAtStart[0].id}`)
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
