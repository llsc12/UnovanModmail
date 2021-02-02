module.exports.permissionRequired = 0
const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });


module.exports.run = async(bot, message, args) => {
    const msg = await message.channel.send("calum is gay for lycan");
    await msg.edit(`:tada: Pong! (Took: ${msg.createdTimestamp - message.createdTimestamp}ms.) :tada:`);
  }

module.exports.help = {
  name: "ping",
  description: "Ping test",
  usage: "ping",
};
