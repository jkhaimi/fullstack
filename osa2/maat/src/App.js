import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

const [data, setData] = useState([]);
const [search, setSearch] = useState('');

useEffect(() => {
  fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then((response) => response.json())
    .then((data) => setData(data))
})

const filteredCountries = data.filter((country) => 
  country.name.common.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div style={{ marginTop: "10px" }}>
        find countries 
        <input
          placeholder='search for countries...'
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {filteredCountries.length > 10 ? (
        <div> Too many matches, specify another filter </div>
      ) : (
        filteredCountries.length === 1 ? (
          filteredCountries.map((country) => (
            <div key={country.name.common}>
              <h1>{country.name.common}</h1>
              <p>capital {country.capital}</p>
              <p>area {country.area}</p>
              <h3>Languages:</h3>
              <ul>
                {Object.entries(country.languages).map(([key, language]) => (
                  <li key={key}>
                    {language}
                  </li>
                ))}
              </ul>
              <img src={country.flags.png}/>
            </div>
          ))
        ) : (
          filteredCountries.map((country) => (
            <div key={country.name.common}>{country.name.common}</div>
          ))
        )
      )}
    </div>
  );
}

export default App;