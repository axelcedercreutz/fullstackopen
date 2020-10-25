import React, { useEffect, useState } from "react";
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from "../queries";
import { useMutation } from "@apollo/client";

const BirthdayForm = (props) => {
  const [editAuthor, result] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const [born, setBorn] = useState(null);
  const [author, setAuthor] = useState(
    props.author ? props.authors[0].name : ""
  );

  useEffect(() => {
    if (props.authors) {
      setAuthor(props.authors[0].name);
    }
  }, [props.authors]);

  const submit = async (event) => {
    event.preventDefault();
    editAuthor({
      variables: { name: author, setBornTo: parseInt(born) },
    });
    setBorn(null);
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <select
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          >
            {props.authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthdayForm;
