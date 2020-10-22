import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import { prettyDOM } from "@testing-library/dom";

test("renders author ", () => {
  const blog = {
    author: "Axel Cedercreutz",
    title: "Hello my friend",
  };

  const component = render(
    <Blog blog={blog} updateBlogs={() => setTimeout()} username={"axel"} />
  );

  expect(component.container).toHaveTextContent("Hello my friend");
});

test("renders title", () => {
  const blog = {
    author: "Axel Cedercreutz",
    title: "Hello my friend",
  };

  const component = render(
    <Blog blog={blog} updateBlogs={() => setTimeout()} username={"axel"} />
  );

  expect(component.container).toHaveTextContent("Axel Cedercreutz");
});

test("doesn't render url or likes", () => {
  const blog = {
    author: "Axel Cedercreutz",
    title: "Hello my friend",
    url: "thisisasite.com",
    likes: 5,
  };

  const component = render(
    <Blog
      blog={blog}
      updateBlog={() => setTimeout()}
      deleteBlog={() => setTimeout()}
      username={"axel"}
    />
  );

  expect(component.container).not.toHaveTextContent("thisisasite.com");
  expect(component.container).not.toHaveTextContent("5");
});

test("renders url and likes when button has been clicked", () => {
  const user = {
    name: "axel",
    username: "axel",
  };
  const blog = {
    author: "Axel Cedercreutz",
    title: "Hello my friend",
    url: "thisisasite.com",
    likes: 5,
    user,
  };
  const mockHandler = jest.fn();

  const component = render(
    <Blog
      blog={blog}
      updateBlog={mockHandler}
      deleteBlog={mockHandler}
      username={"axel"}
    />
  );

  const button = component.container.querySelector(".showBlogInfo");
  fireEvent.click(button);

  expect(component.container).toHaveTextContent("thisisasite.com");
  expect(component.container).toHaveTextContent("5");
});

test("clicking like twice", () => {
  const user = {
    name: "axel",
    username: "axel",
  };
  const blog = {
    author: "Axel Cedercreutz",
    title: "Hello my friend",
    url: "thisisasite.com",
    likes: 5,
    user,
  };

  const mockHandler = jest.fn();

  const component = render(
    <Blog
      blog={blog}
      updateBlog={mockHandler}
      deleteBlog={mockHandler}
      username={blog.user.username}
    />
  );

  const showLike = component.container.querySelector(".showBlogInfo");
  fireEvent.click(showLike);

  const likeButton = component.getByText("like blog");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
