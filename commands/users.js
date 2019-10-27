const { Extra } = require('telegraf');
const groupMiddleware = require('../middlewares/groupMiddleware');
const { renderUsers } = require('../utils');

const users = async (ctx) => {
  const users = await ctx.state.group.getUsers();

  if (!users.length) {
    return ctx.reply('Пользователей пока нет :(\nНачните регистрацию при помощи /start');
  }

  return ctx.reply(renderUsers(users), Extra.markdown().notifications(false));
};

users.register = bot => bot.command('users', groupMiddleware, users);

module.exports = users;

