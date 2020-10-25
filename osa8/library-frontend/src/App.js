import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const Notify = ({ errorMessage }) => {
    if (!errorMessage) {
      return null;
    }
    return <div style={{ color: "red" }}>{errorMessage}</div>;
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      {token ? (
        <>
          <div>
            <button onClick={() => setPage("authors")}>authors</button>
            <button onClick={() => setPage("books")}>books</button>
            <button onClick={() => setPage("add")}>add book</button>
          </div>

          <Authors show={page === "authors"} />

          <Books show={page === "books"} />

          <NewBook show={page === "add"} setError={notify} />

          <div>
            <button onClick={() => logout()}>Logout</button>
          </div>
        </>
      ) : (
        <>
          <h2>Login</h2>
          <LoginForm setToken={setToken} setError={notify} />
        </>
      )}
    </div>
  );
};

export default App;
