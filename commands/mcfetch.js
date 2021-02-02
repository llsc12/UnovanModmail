const fetch = require('node-fetch');
const mcsrv = require('mcsrv');
const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true });


module.exports.run = async(bot, message, args) => {
    const msg = await message.channel.send("Grabbing data");
    if (!args[0]) return msg.edit('Wait- No ip address?!');
    let dldata = await mcsrv(args[0]);
    let mcembed = new Discord.MessageEmbed()
    .setColor('#00FF00')
    .setDescription('Server Status')
    .addField('Hostname',dldata.hostname)
    .addField('Version',dldata.version)
    .addField('Online?',dldata.online)
    .addField('Direct IP',dldata.ip)
    .addField('Player Count',dldata.players.online+'/'+dldata.players.max+' currently online')
    .addField('MOTD','_ _')
    .addField('_ _',dldata.motd.clean[0])
    .addField('_ _',dldata.motd.clean[1])
    .addField('_ _','_ _')
    .setFooter('Requested by '+message.author.tag+', powered by api.mcsrvstat.us', message.author.displayAvatarURL({dynamic: true}));
    msg.edit(mcembed)
  };


module.exports.help = {
  name: "mcfetch",
  description: "Grab stats from a server ip",
  usage: "mcfetch <ip>",
};
// Goodbye sanity -llsc12, 2nd Feb 2021