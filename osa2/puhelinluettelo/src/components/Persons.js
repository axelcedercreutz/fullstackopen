import React from "react";

const Persons = (props) => {
  return props.filteredPeople.map((person) => (
    <div key={person.id}>
      <p>
        {person.name} {person.number}
      </p>
      <button onClick={() => props.handleDelete(person)}>Delete</button>
    </div>
  ));
};

export default Persons;
