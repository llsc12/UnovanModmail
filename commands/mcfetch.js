const mcsrv = require('mcsrv');
const Discord = require('discord.js');

module.exports.run = async(bot, message, args) => {
  async function main(r) {
    var i = 1
    do {
    const msg = await message.channel.send("Grabbing data");
    if (!args[0]) return msg.edit('Wait- No ip address?!');
    let dldata = await mcsrv(args[0]);
    msg.edit('Clearly this isnt working')
    let mcembed = new Discord.MessageEmbed()
    .setColor('#00FFF4')
    .setDescription('Server Status')
    .addField('Hostname',dldata.hostname)
    .addField('Version',dldata.version)
    .addField('Online?',dldata.online)
    .addField('Direct IP',dldata.ip)
    .addField('Player Count',dldata.players.online+'/'+dldata.players.max+' currently online')
    .addField('MOTD', '_ _')
    .addField('_ _', dldata.motd.clean[0])
    .addField('_ _', dldata.motd.clean[1])
    .setFooter('refresh '+i+' of 5, Requested by '+message.author.tag+', powered by api.mcsrvstat.us', message.author.displayAvatarURL({dynamic: true}));
    msg.edit('_ _')
    msg.edit(mcembed)
    await sleep(30000);
    i++;
    }
    while (i < 6);
  }
  };

module.exports.help = {
  name: "mcfetch",
  description: "Grab stats from a server ip",
  usage: "mcfetch <ip>",
};
// Goodbye sanity -llsc12, 2nd Feb 2021 :/