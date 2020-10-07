import React from "react";
import { connect } from "react-redux";
import { addFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  const handleChange = (event) => {
    // input-field value is in variable
    const newFilter = event.target.value.toLowerCase();
    props.addFilter(newFilter);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default connect(null, { addFilter })(Filter);
