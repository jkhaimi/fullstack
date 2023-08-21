import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
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
    event.preventDefault()

  const newPerson = {
    name: newName,
    number: newNumber
  }

  axios
  .post('http://localhost:3001/persons', newPerson)
  .then(response => {
    setPersons(persons.concat(response.data))
  })

  if(persons.some(person => person.name === newName)) {
  alert(`${newName} is already added to the phonebook`)
  } else
  setPersons(persons.concat(newPerson))
  setNewName('')
  setNewNumber('')
}

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()))

 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange}/>

      <h3>add a new</h3>

      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons}/>
    </div>
  )

}

export default App