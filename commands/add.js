const groupMiddleware = require('../middlewares/groupMiddleware');
const { fillQueue, renderQueue } = require('../utils');

const add = async (ctx) => {
  const parts = ctx.update.message.text.split(' ');
  const name = parts[1];

  if (!name) {
    return ctx.reply('Введите желаемое имя очереди через пробел после комманды. Имя должно состоять из 1 слова');
  }

  const queue = await ctx.state.group.createQueue({ name });

  await fillQueue(queue, ctx.state.group);

  return ctx.replyWithMarkdown(await renderQueue(queue));
};

add.register = bot => bot.command(['new', 'add'], groupMiddleware, add);

module.exports = add;
