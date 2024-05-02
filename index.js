const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

app.use(morgan('tiny'));
app.use(morgan(':method :url :status :response-time ms :res[content-length] :POST'));
morgan.token('POST', (req, res) => JSON.stringify(req.body));

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/info', (request, response) => {
  const time = new Date();
  const res = `<p>Phonebook has info for ${persons.length} people</p><p>${time}</p>`;
  response.send(res);
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const person = persons.find((person) => person.id === Number(request.params.id));
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  persons = persons.filter((person) => person.id !== Number(request.params.id));

  response.status(204).end();
});

function generateId() {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing',
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing',
    });
  }

  const findName = persons.find((person) => person.name === body.name);
  if (findName) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  } else {
    const newPerson = {
      id: generateId(),
      name: request.body.name,
      number: request.body.number,
    };
    persons = persons.concat(newPerson);
    response.status(201).json(newPerson);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
