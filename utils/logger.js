const morgan = require('morgan');

morgan.token('POST', (req, res) => JSON.stringify(req.body));
const morganTinyLogger = morgan('tiny');
const morganCustomLogger = morgan(':method :url :status :response-time ms :res[content-length] :POST');

const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  console.error(...params);
};

module.exports = {
  info,
  error,
  morganTinyLogger,
  morganCustomLogger,
};
