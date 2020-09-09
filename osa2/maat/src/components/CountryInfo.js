import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryInfo = (props) => {
  const { country } = props;
  const [weatherData, setWeatherData] = useState();
  console.log(weatherData);

  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=` +
          api_key +
          `&query=` +
          country.capital +
          `&units=m`
      )
      .then((response) => {
        console.log("promise fulfilled");
        setWeatherData(response.data);
      });
  }, []);

  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <br />
      <h3>languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} height={100} width={100} />
      {weatherData && (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>temperature: {weatherData.current.temperature} Celsius</p>
          <img
            src={weatherData.current.weather_icons[0]}
            height={100}
            width={100}
          ></img>
          <p>
            wind: {weatherData.current.wind_speed}
            {"m/s direction "}
            {weatherData.current.wind_dir}
          </p>
        </div>
      )}
    </>
  );
};

export default CountryInfo;
