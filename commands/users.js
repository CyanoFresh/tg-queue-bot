const groupMiddleware = require('../utils/groupMiddleware');
const { Group } = require('../models');

/**
 * @param {ContextMessageUpdate} ctx
 * @returns {Promise<Message|Middleware<ContextMessageUpdate>>}
 */
const users = async (ctx) => {
  const isFromGroup = ctx.update.message.chat.id < 0;

  if (isFromGroup) {
    const group = await Group.findOne({
      where: {
        chat_id: ctx.update.message.chat.id,
      },
    });

    if (!group) {
      return ctx.reply('Пользователей пока нет :(\nНачните регистрацию при помощи /start');
    }

    const users = await group.getUsers();

    if (!users.length) {
      return ctx.reply('Пользователей пока нет :(\nНачните регистрацию при помощи /start');
    }

    const userList = users.reduce(
      (userList, user, index) => userList + `${index + 1}. [${user.name}](tg://user?id=${user.chat_id})\n`,
      '',
    );

    return ctx.replyWithMarkdown(userList);
  } else {
    return ctx.reply('Эту команду можно использовать только в групповом чате');
  }
};

users.register = bot => bot.command('users', groupMiddleware, users);

module.exports = users;

