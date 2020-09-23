import React, { useState, useEffect } from "react";
import apiService from "./services/api";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState();
  const [notificationType, setNotificationType] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    apiService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const newPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newPhone,
    };
    const alreadyIn = persons.find((person) => person.name === newName);
    if (alreadyIn) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        apiService
          .update(alreadyIn.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== alreadyIn.id ? person : returnedPerson
              )
            );
            setNotificationMessage(`${alreadyIn.name} information was updated`);
            setNotificationType("success");
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
            setNewName("");
            setNewPhone("");
          })
          .catch((error) => {
            setNotificationMessage(
              `${alreadyIn.name} was already removed from server`
            );
            setNotificationType("error");
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          });
      }
    } else {
      apiService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons([...persons, returnedPerson]);
          setNotificationMessage(
            `${returnedPerson.name} was added to phonebook`
          );
          setNotificationType("success");
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
          setNewName("");
          setNewPhone("");
        })
        .catch((error) => {
          console.log(error.response.data);
          setNotificationMessage(`${error.response.data.error}`);
          setNotificationType("error");
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      apiService.deletePerson(person.id).then((data) => {
        const newPersons = persons.filter((p) => p.id !== person.id);
        setPersons(newPersons);
      });
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
        <Notification
          message={notificationMessage}
          notificationType={notificationType}
        />
        <PersonForm
          newName={newName}
          newPhone={newPhone}
          setNewName={(e) => setNewName(e)}
          setNewPhone={(e) => setNewPhone(e)}
          handleClick={(e) => newPerson(e)}
        />
        <h2>Numbers</h2>
        <Persons
          filteredPeople={filteredPeople}
          handleDelete={(e) => deletePerson(e)}
        />
      </div>
    </>
  );
};

export default App;
