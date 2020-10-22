import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearUser } from "../reducers/userReducer";

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const padding = {
    paddingRight: 5,
  };
  const name = {
    paddingRight: 4,
    display: "inline-block",
  };
  const inlineBlock = {
    display: "inline-block",
  };
  const gray = {
    backgroundColor: "lightgray",
    paddingLeft: 8,
  };

  return (
    <div style={gray}>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user !== null && (
        <div style={inlineBlock}>
          <p style={name}>{user.name + " logged in"}</p>
          <button
            style={padding}
            onClick={() => {
              dispatch(clearUser());
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
