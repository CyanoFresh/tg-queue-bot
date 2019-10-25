if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const Telegraf = require('telegraf');
const session = require('telegraf/session');
const { sequelize } = require('./models');
const { start } = require('./commands');

sequelize
  .authenticate()
  .then(() => {
    console.log('DB connected');

    const bot = new Telegraf(process.env.BOT_TOKEN);

    bot.use(session());

    // Register commands
    start.register(bot);

    bot.launch().then(() => console.log('Bot started'));
  })
  .catch(err => {
    console.error('Unable to connect to the DB:', err);
    process.exit();
  });
