const listHelper = require("../utils/list_helper");

const listWithNoBlog = [];

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

const listWithTwoBlogs = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f4",
    title: "Go To Statement Considered",
    author: "Jack W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 4,
    __v: 0,
  },
];

const listWithThreeBlogs = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f1",
    title: "Go To Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f4",
    title: "Go To Statement Considered",
    author: "Jack W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 4,
    __v: 0,
  },
];

test("dummy returns one", () => {
  const result = listHelper.dummy(listWithNoBlog);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("when list empty returns 0", () => {
    const result = listHelper.totalLikes(listWithNoBlog);
    expect(result).toBe(0);
  });
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
  test("when list has two blogs, equals the sum of those", () => {
    const result = listHelper.totalLikes(listWithTwoBlogs);
    expect(result).toBe(11);
  });
});

describe("favorite blog", () => {
  test("when list empty returns undefined", () => {
    const result = listHelper.favoriteBlog(listWithNoBlog);
    expect(result).toBe(undefined);
  });
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result.likes).toEqual(5);
  });
  test("when list has two blogs, equals larger of the two", () => {
    const result = listHelper.favoriteBlog(listWithTwoBlogs);
    expect(result.likes).toEqual(7);
  });
});

describe("Most blogs", () => {
  test("when list of 3 blogs has two blogs from same author, return that author and blog amout 2", () => {
    const result = listHelper.mostBlogs(listWithThreeBlogs);
    expect(result.blogs).toEqual(2);
  });
});

describe("Most likes", () => {
  test("when list has two blogs from same author, return that author and sum of like amount", () => {
    const result = listHelper.mostLikes(listWithThreeBlogs);
    expect(result.likes).toEqual(12);
  });
});
