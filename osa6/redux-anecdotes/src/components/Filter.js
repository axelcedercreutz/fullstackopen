import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilter } from "../reducers/filterReducer";

const Filter = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    // input-field value is in variable
    const newFilter = event.target.value.toLowerCase();
    dispatch(addFilter(newFilter));
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

export default Filter;
