const config = require('../config');

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.error('asyncMiddleware error:', ctx, error);

    await ctx.reply('Произошла ошибка :/\nСкоро пофиксим');
    await ctx.telegram.sendMessage(config.errorReportChatId, `Error from @${ctx.botInfo.username}:\n${error.stack}`);
  }
};
