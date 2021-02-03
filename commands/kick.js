const Discord = require("discord.js");
const discord = require("discord.js");
module.exports.run = async (client, message, args) => {
    message.delete()
    if(!message.member.hasPermission("KICK_MEMBERS")) return;
    if(args[0] == "help"){
      message.reply("Usage: &kick <user> <reason>");
      return;
    }
    let kUser = message.guild.members.cache.get(args[0]);
    if(!kUser) return;
    let kReason = args.join(" ").slice(22);
    if(kUser.hasPermission("MANAGE_MESSAGES")) return;

    let kickEmbed = new discord.MessageEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "logs");
    if(!kickChannel) return message.channel.send("Can't find logs channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}

module.exports.help = {
  name:"kick"
}
