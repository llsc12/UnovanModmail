const mcsrv = require('mcsrv');
const Discord = require('discord.js');
let sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports.run = async(bot, message, args) => {
  let repeat = (parseInt(args[1])+1)
  if (!args[1]) repeat = 4;
  if (repeat >= 11) return msg.edit('You can\'t refresh that many times')
  const msg = await message.channel.send("Grabbing data");
  if (!args[0]) return msg.edit('Wait- No ip address?!');
  msg.edit('i think something broke') // :'(
  let dldata = 'NaN';
  dldata = await mcsrv(args[0]);
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
  .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
  msg.edit('_ _')
  msg.edit(mcembed)
  };

module.exports.help = {
  name: "mcfetch",
  description: "Grab stats from a server ip",
  usage: "mcfetch <ip>",
};
// Goodbye sanity -llsc12, 2nd Feb 2021 :/