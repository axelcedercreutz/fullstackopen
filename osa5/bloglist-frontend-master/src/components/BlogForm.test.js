import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";
import { prettyDOM } from "@testing-library/dom";
import { act } from "react-dom/test-utils";

test("sublit new blog", () => {
  const handleAddBlog = jest.fn();

  const component = render(<BlogForm handleAddBlog={handleAddBlog} />);

  const addblogBtn = component.getByText("Add blog");
  act(() => {
    fireEvent.click(addblogBtn);
  });
  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");
  const form = component.container.querySelector("form");
  act(() => {
    fireEvent.change(title, {
      target: { value: "testing of forms could be easier" },
    });
    fireEvent.change(author, {
      target: { value: "Axel" },
    });
    fireEvent.change(url, {
      target: { value: "letsgo.com" },
    });
    fireEvent.submit(form);
  });

  expect(handleAddBlog.mock.calls).toHaveLength(1);
});
