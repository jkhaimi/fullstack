import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

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
      <h1>Phonebook</h1>
      filter shown with <input value={searchTerm} onChange={handleSearchChange} />
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
          <p>name: <input value={newName} onChange={handleNameChange} /></p>
          <p>number: <input value={newNumber} onChange={handleNumberChange} /></p>
          <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
        {filteredPersons.map((person, index) => <p key={index}>{person.name} {person.number}</p>)}
    </div>
  )

}

export default App