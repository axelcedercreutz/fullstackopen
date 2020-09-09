import React from "react";

const Filter = (props) => {
  return (
    <>
      <p>
        find countries
        <br />
        <input
          onChange={(e) => props.setFilter(e.target.value.toLocaleLowerCase())}
        />
      </p>
    </>
  );
};

export default Filter;
