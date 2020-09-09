import React from "react";

const PersonForm = (props) => {
  const { newName, newPhone, setNewPhone, setNewName, handleClick } = props;
  return (
    <form>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        <div>
          number:{" "}
          <input
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button type="submit" onClick={(e) => handleClick(e)}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
