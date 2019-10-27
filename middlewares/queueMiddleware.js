const { Queue } = require('../models');

module.exports = async (ctx, next) => {
  const queueId = ctx.match[1];

  ctx.state.queue = await Queue.findOne({
    where: {
      id: queueId,
      GroupId: ctx.state.group.id,
    },
  });

  if (!ctx.state.queue) {
    if (ctx.updateType === 'callback_query') {
      return ctx.editMessageText('Очередь не найдена');
    }

    return ctx.reply('Очередь не найдена');
  }

  return next();
};
