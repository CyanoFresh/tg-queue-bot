module.exports = {
  doneUserAppend: ' ✅',
  buttonsInRow: 3,
  errorReportChatId: process.env.ERROR_CHAT_ID,
  webhook: process.env.BOT_DOMAIN ? {
    domain: process.env.BOT_DOMAIN,
    port: process.env.BOT_PORT || 4000,
  } : undefined,
};
