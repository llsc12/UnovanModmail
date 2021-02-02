const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (message.author.bot) return;
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
    message.delete()
    if(!args[0]) return message.channel.send("Please provide an amount, like this: clear x");
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete({ timeout: 2000 }));
  });
}

module.exports.help = {
  name: "clear",
  description: "clear some messages",
  usage: "clear <integer>",
};
