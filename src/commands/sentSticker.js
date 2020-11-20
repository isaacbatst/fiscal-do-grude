const fs = require('fs');

const sentSticker = (bot, database) => {
  bot.onText(/\/enviou_figurinha/, msg => {

    bot.sendMessage(msg.chat.id, 'foi isaac');

    const [command, username] = msg.text.split(' ');

    console.log(command, username)

    if (!username) {
      return bot.sendMessage(msg.chat.id, 'Nenhum usuário encontrado');
    }

    return bot.getChat(msg.chat.id)
      .then(chat => bot.sendMessage(msg.chat.id, JSON.stringify(chat)))

    fs.readFile(database, (error, data) => {
      if (error) throw error;

      const parsedData = JSON.parse(data)

      pushDebtor(parsedData);
    });

  })
}


function pushDebtor(data) {
  const newData = {
    ...data,
    debtors: [
      ...data.debtors,
      { name: 'Isaac' }
    ]
  }

  fs.writeFile(database, JSON.stringify(newData), error => {
    if (error) throw error;

    console.log('data saved');
  })
}

module.exports = sentSticker;
