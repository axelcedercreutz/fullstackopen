import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import CountryInfo from "./components/CountryInfo";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState();
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = filter
    ? countries.filter((country) =>
        country.name.toLocaleLowerCase().includes(filter)
      )
    : countries;

  const showMultipleFilter = countries.filter((country) =>
    countriesToShow.includes(
      (countriesShow) => countriesShow === country.name.toLocaleLowerCase()
    )
  );

  const handleShow = (name) => {
    const newCountriesToShow = [...countriesToShow, name];
    setCountriesToShow(newCountriesToShow);
  };

  return (
    <>
      <div>
        <div>
          <Filter filter={filter} setFilter={(e) => setFilter(e)} />
        </div>
        {filteredCountries.length === 1
          ? filteredCountries.map((country) => (
              <CountryInfo country={country} key={country.name} />
            ))
          : filteredCountries.length < 10
          ? filteredCountries.map((country) => {
              return countriesToShow.includes(country.name) ? (
                <CountryInfo country={country} key={country.name} />
              ) : (
                <div key={country.name}>
                  <p>{country.name}</p>
                  <button onClick={() => handleShow(country.name)}>Show</button>
                </div>
              );
            })
          : filter && <p>Too many matches, specify another filter</p>}
      </div>
    </>
  );
};

export default App;
