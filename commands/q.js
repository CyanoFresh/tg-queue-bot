const { Markup } = require('telegraf');
const config = require('../config');
const groupMiddleware = require('../utils/groupMiddleware');

/**
 * @param {ContextMessageUpdate} ctx
 * @returns {Promise<Message|Middleware<ContextMessageUpdate>>}
 */
const q = async (ctx) => {
  if (!ctx.state.group) {
    return ctx.reply('Очередей пока что нет');
  }

  const queues = await ctx.state.group.getQueues();

  if (!queues.length) {
    return ctx.reply('Очередей пока что нет');
  }

  return ctx.reply('Выбери очередь:', Markup.inlineKeyboard(
    queues.map(queue => Markup.callbackButton(queue.name, `q_${queue.id}`)),
    { columns: config.buttonsInRow },
  ).extra());
};

/**
 * @param {ContextMessageUpdate} ctx
 * @returns {Promise<Message|Middleware<ContextMessageUpdate>>}
 */
const viewQueue = async (ctx) => {
  const queue = await ctx.state.group.getQueues({ where: { id: ctx.match[0] }, limit: 1 });

  if (!queue.length) {
    return ctx.reply('Очередь не найдена');
  }

  const users = queue[0].getUsers();

  return ctx.reply(queue.name);
};

q.register = bot => {
  bot.command(['q', 'list'], groupMiddleware, q);
  bot.action(/^q_(\d+)/, groupMiddleware, viewQueue);

  return bot;
};

module.exports = q;
