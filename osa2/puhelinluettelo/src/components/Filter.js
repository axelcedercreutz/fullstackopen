import React from "react";

const Filter = (props) => {
  return (
    <>
      <p>
        filter shown with{" "}
        <input
          onChange={(e) => props.setFilter(e.target.value.toLocaleLowerCase())}
        />
      </p>
    </>
  );
};

export default Filter;
