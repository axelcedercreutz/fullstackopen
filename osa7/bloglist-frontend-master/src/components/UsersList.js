import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UsersList = () => {
  const users = useSelector((state) => state.users);

  const renderUsers = () => (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>
              <p>{user.blogs.length}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  return renderUsers();
};

export default UsersList;
