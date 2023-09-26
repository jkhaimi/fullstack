import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  const handleSearchChange = (e) => {
    // Reset selectedCountry to null when the input changes
    setSelectedCountry(null);
    setSearch(e.target.value);
  };

  let filteredCountries = data.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedCountry) {
    filteredCountries = [selectedCountry];
  }

  return (
    <div>
      <div style={{ marginTop: "10px" }}>
        find countries 
        <input
          placeholder='search for countries...'
          value={search} 
          onChange={handleSearchChange}
        />
      </div>
      
      {filteredCountries.length > 10 ? (
        <div> Too many matches, specify another filter </div>
      ) : (
        filteredCountries.map((country) => (
          <div key={country.name.common}>
            {selectedCountry === country || filteredCountries.length === 1 ? (
              <div>
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
                <img src={country.flags.png} alt="flag" />
              </div>
            ) : (
              <div>
                <span>{country.name.common}</span>
                <button onClick={() => handleShowCountry(country)}>
                  show
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default App;
