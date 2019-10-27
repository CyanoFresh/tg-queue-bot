const groupMiddleware = require('../middlewares/groupMiddleware');
const queueMiddleware = require('../middlewares/queueMiddleware');
const { getGroupQueuesKeyboard, renderQueue } = require('../utils');

const list = async (ctx) => ctx.reply(
  'Выбери очередь:',
  await getGroupQueuesKeyboard(ctx.state.group, 'q'),
);

const view = async (ctx) => {
  await ctx.answerCbQuery();
  return ctx.editMessageText(await renderQueue(ctx.state.queue), {
    disable_notification: true,
    parse_mode: 'Markdown',
  });
};

list.register = bot => {
  bot.command(['q', 'list'], groupMiddleware, list);
  bot.action(/^q_(\d+)/, groupMiddleware, queueMiddleware, view);
};

module.exports = list;
