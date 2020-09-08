import React from "react";

const Total = (props) => {
  const total = props.course.parts.reduce((a, b) => a + b.exercises, 0);

  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
};

export default Total;
