const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;

exports.PORT = port;