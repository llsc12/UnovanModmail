const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (message.author.bot) return;
    if (!args[0]) return message.channel.send("No user specified")

        let randomnumber = Math.floor((Math.random() * 160) - 137);
        if (randomnumber <= -130){
            return message.channel.send("Cooled "+args[0]+" to "+randomnumber+"°C, they're now in cryogenic stasis.")
        }
        else if (randomnumber <= -15) {

            return message.channel.send("Cooled "+args[0]+" to "+randomnumber+"°C, they're quite cold now.")
        }
        else if (randomnumber <= 0) {
            return message.channel.send("Cooled "+args[0]+" to "+randomnumber+"°C, they're a bit cold now.")
        }

        else 

            return message.channel.send("Cooled "+args[0]+" to "+randomnumber+"°C.")
};

    module.exports.help = {
        name: "cool",
        description: "cool someone",
        usage: "cool <someone>",
    };  
