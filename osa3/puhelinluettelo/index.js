const express = require('express')
const app = express()
app.use(express.json())

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
  }
]

// For the main page

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

// For the info page

app.get('/info', (req, res) => {
  const RequestTime = new Date().toString();
  res.send(`Phonebook has info of ${persons.length} people. <br> ${RequestTime}`)
})

// For looking at all the persons

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// For looking for a specific person

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => {
    console.log(person.id, typeof person.id, id, typeof id, person.id === id)
    return person.id === id
  })
  console.log(person)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

// For deleting a person

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

// For adding a new person

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.floor(Math.random() * 100)
    : 0;
  return maxId + 1;
};

app.post('/api/persons', (req, res) => {
  const body = req.body

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  console.log(person)
  res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})