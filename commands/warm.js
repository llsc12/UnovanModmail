const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (message.author.bot) return;
    if (!args[0]) return message.channel.send("No user specified")

        let randomnumber = Math.floor((Math.random() * 85) + 35);
        if (randomnumber >= 60) {
            return message.channel.send("Warmed "+args[0]+" to "+randomnumber+"°C, they're quite burnt now.")
        }
        else if (randomnumber >= 45) {
            return message.channel.send("Warmed "+args[0]+" to "+randomnumber+"°C, they're a little burnt now.")
        }
        else {
            return message.channel.send("Warmed "+args[0]+" to "+randomnumber+"°C.")
        }
};

module.exports.help = {
    name: "warm",
    description: "warm someone",
    usage: "warm <someone>",
};
