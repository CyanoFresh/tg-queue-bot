const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const { generateGroupHash } = require('../utils');
const { Group, User } = require('../models');

const start = async (ctx) => {
  const isFromGroup = ctx.update.message.chat.id < 0;

  if (!isFromGroup && ctx.startPayload) {
    const group = await Group.findOne({
      where: {
        hash: ctx.startPayload,
      },
    });

    if (!group) {
      return ctx.reply(
        'Добавьте бота в группу, в которой хотите создавать очереди',
        Markup.inlineKeyboard([
          Markup.urlButton('Добавить в группу', `https://telegram.me/${ctx.botInfo.username}?startgroup=startgroup`),
        ]).extra(),
      );
    }

    if (await User.count({
      where: {
        chat_id: ctx.update.message.from.id,
        GroupId: group.id,
      },
    })) {
      return ctx.replyWithMarkdown(`Ты уже участвуешь в очередях в группе *${group.name}*`);
    }

    let name;

    if (ctx.from.first_name || ctx.from.last_name) {
      name = (ctx.from.first_name || '') + ' ' + (ctx.from.last_name || '');
    } else {
      name = ctx.from.username;
    }

    const user = await User.create({
      chat_id: ctx.update.message.from.id,
      GroupId: group.id,
      name,
    });

    return ctx.replyWithMarkdown(`Теперь вы участвуете в очередях в группе *${group.name}* под именем *${user.name}*`);
  }

  if (isFromGroup) {
    let group = await Group.findOne({
      where: {
        chat_id: ctx.update.message.chat.id,
      },
    });

    if (!group) {
      group = await Group.create({
        chat_id: ctx.update.message.chat.id,
        name: ctx.update.message.chat.title,
        hash: generateGroupHash(),
      });
    }

    return ctx.reply('Нажми на кнопку, чтобы участвовать в очередях', Extra.markup(Markup.inlineKeyboard([
      Markup.urlButton('Регистрация', `https://telegram.me/${ctx.botInfo.username}?start=${group.hash}`),
    ])));
  }

  return ctx.reply(
    'Добавьте бота в группу, в которой хотите создавать очереди',
    Markup.inlineKeyboard([
      Markup.urlButton('Добавить в группу', `https://telegram.me/${ctx.botInfo.username}?startgroup=startgroup`),
    ]).extra(),
  );
};

start.register = bot => bot.start(start);

module.exports = start;
