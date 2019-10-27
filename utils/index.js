const { Markup } = require('telegraf');
const config = require('../config');

const generateGroupHash = () => Math.random().toString(36).substring(2, 15);

const renderUsers = (users) => users.reduce(
  (t, user, index) => {
    let doneMark = '';
    return t + `${index + 1}. [${user.name}](tg://user?id=${user.chat_id})${doneMark}\n`;
  },
  '',
);

const renderQueue = async (queue) => {
  const users = await queue.getUsers();

  return `Очередь "${queue.name}"\n\n${renderUsers(users)}`;
};

const fillQueue = async (queue, group) => {
  const users = await group.getUsers();

  // Shuffle array:
  // https://stackoverflow.com/a/12646864/4009260
  for (let i = users.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [users[i], users[j]] = [users[j], users[i]];
  }

  await Promise.all(users.map(user => queue.addUser(user)));

  return queue;
};
const getGroupQueuesKeyboard = async (group, action) => {
  const queues = await group.getQueues();

  return Markup.inlineKeyboard(
    queues.map(queue => Markup.callbackButton(queue.name, `${action}_${queue.id}`)),
    { columns: config.buttonsInRow },
  ).extra();
};

module.exports = {
  generateGroupHash,
  fillQueue,
  renderUsers,
  renderQueue,
  getGroupQueuesKeyboard,
};
