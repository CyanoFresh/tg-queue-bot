const groupMiddleware = require('../utils/groupMiddleware');

/**
 * @param {ContextMessageUpdate} ctx
 * @returns {Promise<Message|Middleware<ContextMessageUpdate>>}
 */
const add = async (ctx) => {
  const parts = ctx.update.message.text.split(' ');
  const queueName = parts[1];

  if (!queueName) {

  }

  return ctx.replyWithMarkdown(queueName);
};

add.register = bot => bot.command(['new', 'add'], groupMiddleware, add);

module.exports = add;
