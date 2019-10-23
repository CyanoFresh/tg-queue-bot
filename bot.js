if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { Composer } = require('micro-bot');
const bot = new Composer();

module.exports = bot;
