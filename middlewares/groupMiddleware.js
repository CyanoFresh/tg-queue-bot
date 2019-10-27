const { Group } = require('../models');

module.exports = async (ctx, next) => {
  const src = ctx.update.message || ctx.update.callback_query.message;

  if (src) {
    const chatId = src.chat.id;
    const isFromGroup = chatId < 0;

    if (!isFromGroup) {
      return ctx.reply('Эту команду можно использовать только в групповом чате');
    }

    const group = await Group.findOne({
      where: {
        chat_id: chatId,
      },
    });

    if (!group) {
      return ctx.reply('Группа не зарегестрирована\nИспользуйте /start');
    }

    ctx.state.group = group;
  }

  return next();
};
