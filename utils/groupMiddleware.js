const { Group } = require('../models');

module.exports = async (ctx, next) => {
  if (ctx.update.message) {
    const isFromGroup = ctx.update.message.chat.id < 0;

    if (!isFromGroup) {
      return ctx.reply('Эту команду можно использовать только в групповом чате');
    }

    const group = await Group.findOne({
      where: {
        chat_id: ctx.update.message.chat.id,
      },
    });

    if (!group) {
      return ctx.reply('Группа не зарегестрирована\nИспользуйте /start');
    }

    ctx.state.group = group;
  }

  return next();
};
