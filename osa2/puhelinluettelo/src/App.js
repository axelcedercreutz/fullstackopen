import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState();

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

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
