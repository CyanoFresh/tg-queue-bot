const groupMiddleware = require('../middlewares/groupMiddleware');
const queueMiddleware = require('../middlewares/queueMiddleware');
const { getGroupQueuesKeyboard } = require('../utils');

const del = async (ctx) => ctx.replyWithMarkdown(
  'Выбери очередь *для удаления*:',
  await getGroupQueuesKeyboard(ctx.state.group, 'del'),
);

const deleteAction = async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.state.queue.destroy();
  return ctx.editMessageText(`Очередь "${ctx.state.queue.name}" удалена`);
};

del.register = bot => {
  bot.command(['del', 'delete'], groupMiddleware, del);
  bot.action(/^del_(\d+)/, groupMiddleware, queueMiddleware, deleteAction);
};

module.exports = del;
