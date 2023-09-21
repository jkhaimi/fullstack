import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
        personService.deletePerson(id)
            .then(() => {
                setPersons(persons.filter(person => person.id !== id))
            })
    }
}

  useEffect(() => {
    personService.getPersons().then(data => setPersons(data))
  }, [])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault();
  
    const newPerson = {
      name: newName,
      number: newNumber,
    };
  
    const existingPerson = persons.find((person) => person.name === newName);
  
    if (existingPerson) {
      if (existingPerson.number === newNumber) {
        // Henkilö samalla nimellä ja numerolla on jo olemassa
        alert(`${newName} is already added to the phonebook.`);
        setNewName('');
        setNewNumber('');
      } 
      
      else {
        // Henkilö samalla nimellä mutta eri numerolla on olemassa
        const confirmMessage = `${newName} is already added to the phonebook. Do you want to update the old number with the new number?`;
        if (window.confirm(confirmMessage)) {
          const updatedPerson = { ...existingPerson, number: newNumber };
          personService.updatePerson(existingPerson.id, updatedPerson)
            .then((data) => {
              setPersons(persons.map((person) => (person.id === data.id ? data : person)));
            });
          setNewName('');
          setNewNumber('');
        }
      }
    } 
    
    else {
      // Henkilöä ei ole vielä olemassa
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
      personService.addPerson(newPerson).then(data => setPersons(persons.concat(data)));
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()))

 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange}/>

      <h3>add a new</h3>

      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  )

}

export default App