import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState();

  const handleClick = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newPhone,
    };
    const alreadyIn = persons.find((person) => person.name === newName);
    if (alreadyIn) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, newPerson]);
      setNewName("");
      setNewPhone("");
    }
  };

  const filteredPeople = filter
    ? persons.filter((person) =>
        person.name.toLocaleLowerCase().includes(filter)
      )
    : persons;

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <div>
          <Filter filter={filter} setFilter={(e) => setFilter(e)} />
        </div>
        <PersonForm
          newName={newName}
          newPhone={newPhone}
          setNewName={(e) => setNewName(e)}
          setNewPhone={(e) => setNewPhone(e)}
          handleClick={(e) => handleClick(e)}
        />
        <h2>Numbers</h2>
        <Persons filteredPeople={filteredPeople} />
      </div>
    </>
  );
};

export default App;
