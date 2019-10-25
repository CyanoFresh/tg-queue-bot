const config = require('../config');

module.exports = (fn) => {
  return async function(ctx, next) {
    try {
      return await fn(ctx);
    } catch (error) {
      console.error('asyncWrapper error caught:', ctx, error);

      await ctx.reply('Произошла ошибка :/\nСкоро пофиксим');
      await ctx.telegram.sendMessage(config.errorReportChatId, `Error from @${ctx.botInfo.username}:\n${error.stack}`);

      return next();
    }
  };
};
