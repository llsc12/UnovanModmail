const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (message.author.bot) return;
    if(!args[0]) return message.channel.send("please provide a name!");
    message.channel.send(`${args[0]} is now vanned.`);
}

module.exports.help = {
  name: "van",
  description: "van someone ¯\_(ツ)_/¯",
  usage: "van @someone",
};
