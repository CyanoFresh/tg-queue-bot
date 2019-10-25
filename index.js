if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const Telegraf = require('telegraf');
const session = require('telegraf/session');
const { sequelize } = require('./models');
const { start, users, q, add } = require('./commands');
const errorHandler = require('./utils/errorHandler');

sequelize
  .authenticate()
  .then(() => {
    console.log('DB connected');

    const bot = new Telegraf(process.env.BOT_TOKEN);

    bot.use(errorHandler);
    bot.use(session());

    // Register commands
    start.register(bot);
    users.register(bot);
    q.register(bot);
    add.register(bot);

    bot.launch().then(() => console.log('Bot started'));
  })
  .catch(err => {
    console.error('Unable to connect to the DB:', err);
    process.exit();
  });
