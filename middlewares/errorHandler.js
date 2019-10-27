const config = require('../config');

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.error('asyncMiddleware error:', ctx, error);

    const msg = 'Произошла ошибка :/\nСкоро пофиксим';

    if (ctx.updateType === 'callback_query') {
      await ctx.editMessageText(msg);
    } else {
      await ctx.reply(msg);
    }

    await ctx.telegram.sendMessage(config.errorReportChatId, `Error from @${ctx.botInfo.username}:\n${error.stack}`);
  }
};
