const { Extra } = require('telegraf');
const groupMiddleware = require('../middlewares/groupMiddleware');
const queueMiddleware = require('../middlewares/queueMiddleware');
const { getGroupQueuesKeyboard, renderQueue } = require('../utils');

const done = async (ctx) => ctx.replyWithMarkdown(
  `[${ctx.update.message.from.username}](tg://user?id=${ctx.update.message.from.id}) выбери очередь, в которой тебя отметить:`,
  await getGroupQueuesKeyboard(ctx.state.group, 'done'),
);

const undone = async (ctx) => ctx.replyWithMarkdown(
  `[${ctx.update.message.from.username}](tg://user?id=${ctx.update.message.from.id}) выбери очередь, в которой снять отметку:`,
  await getGroupQueuesKeyboard(ctx.state.group, 'undone'),
);

const handleAction = async (ctx) => {
  const chat_id = ctx.update.callback_query.message.entities[0].user.id;

  if (ctx.update.callback_query.from.id !== chat_id){
    return ctx.answerCbQuery('Вам не разрешено производить это действие');
  }

  await ctx.answerCbQuery();

  const users = await ctx.state.queue.getUsers({
    where: {
      GroupId: ctx.state.group.id,
      chat_id,
    },
  });

  if (!users.length) {
    return ctx.editMessageText('Ты не участвуешь в этой очереди\nНажми /start для регистрации');
  }

  const user = users[0];
  user.QueueUser.done = !ctx.match[1];
  await user.QueueUser.save();

  return ctx.editMessageText(await renderQueue(ctx.state.queue), Extra.markdown().notifications(false));
};

done.register = bot => {
  bot.command(['done'], groupMiddleware, done);
  bot.command(['undone'], groupMiddleware, undone);
  bot.action(/^(un)?done_(\d+)/, groupMiddleware, queueMiddleware, handleAction);
};

module.exports = done;
