import React, { useState } from "react";
import axios from "axios";

export default function SearchEngine() {
  const [city, setCity] = useState(""); // nothing shows with default behavior
  const [load, setLoad] = useState(false);
  const [weather, setWeather] = useState({}); // no value with default behavior

  function updateCity(event) {
    setCity(event.target.value);
  }

  function displayWeather(response) {
    setLoad(true);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    // required to access to the updated city
    // make an API call
    // update the weather UI
    let units = "metric";
    let apiKey = "eb2ee96fce77dd8a4eaad97e550c01d8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeather);
  }
  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter a city..."
        autoFocus={true}
        onChange={updateCity}
      />
      <input type="submit" value="Search" />
    </form>
  );

  if (load) {
    return (
      <div>
        {form}

        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}</li>
          <li>Wind: {Math.round(weather.wind)}</li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
