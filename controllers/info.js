const infoRouter = require('express').Router();
const Person = require('../models/person');

infoRouter.get('/', async (request, response) => {
  const time = new Date();
  let count = 0;
  await Person.collection.countDocuments().then((result) => (count = result));
  const res = `<p>Phonebook has info for ${count} people</p><p>${time}</p>`;
  response.send(res);
});

module.exports = infoRouter;
