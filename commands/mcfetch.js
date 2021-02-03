const mcsrv = require('mcsrv');
const Discord = require('discord.js');
function RandColor(p1) {
  if (!p1) { 
    let color1 = Math.floor(Math.random() * 15);
    let color2 = Math.floor(Math.random() * 15);
    let color3 = Math.floor(Math.random() * 15);
    let color4 = Math.floor(Math.random() * 15);
    let color5 = Math.floor(Math.random() * 15);
    let color6 = Math.floor(Math.random() * 15);
    let colorletter = new Array();
    colorletter[0] = '0';
    colorletter[1] = '1';
    colorletter[2] = '2';
    colorletter[3] = '3';
    colorletter[4] = '4';
    colorletter[5] = '5';
    colorletter[6] = '6';
    colorletter[7] = '7';
    colorletter[8] = '8';
    colorletter[9] = '9';
    colorletter[10] = 'a';
    colorletter[11] = 'b';
    colorletter[12] = 'c';
    colorletter[13] = 'd';
    colorletter[14] = 'e';
    colorletter[15] = 'f';
    let color = (colorletter[color1]+colorletter[color2]+colorletter[color3]+colorletter[color4]+colorletter[color5]+colorletter[color6]);
    return color;
  } else return p1;
}

module.exports.run = async(bot, message, args) => {
    const msg = await message.channel.send("Grabbing data");
    if (!args[0]) return msg.edit('Wait- No ip address?!');
    let dldata = await mcsrv(args[0]);
    await msg.edit('Clearly this isnt working')
    let mcembed = new Discord.MessageEmbed()
    .setColor(RandColor)
    .setDescription('Server Status')
    .addField('Hostname',dldata.hostname)
    .addField('Version',dldata.version)
    .addField('Online?',dldata.online)
    .addField('Direct IP',dldata.ip)
    .addField('Player Count',dldata.players.online+'/'+dldata.players.max+' currently online')
    .addField('MOTD')
    .addField(dldata.motd.clean[0])
    .addField(dldata.motd.clean[1])
    .setFooter('Requested by '+message.author.tag+', powered by api.mcsrvstat.us', message.author.displayAvatarURL({dynamic: true}));
    msg.edit('API Response received')
    msg.edit(mcembed)
  };


module.exports.help = {
  name: "mcfetch",
  description: "Grab stats from a server ip",
  usage: "mcfetch <ip>",
};
// Goodbye sanity -llsc12, 2nd Feb 2021 :/