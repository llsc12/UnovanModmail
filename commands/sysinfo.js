const Discord = require('discord.js');
const si = require('systeminformation')

module.exports.run = async(bot, message, args) => {
  si.cpu()
  .then(data => {
      console.log(data.manufacturer, data.brand+',', data.physicalCores,'Core Processor. Running at',data.speed,'GHz')
    })
si.memLayout()
  .then(data => {
    for (let step = 0; step < Object.keys(data).length; step++) {
      // Runs 5 times, with values of step 0 through 4.
      message.channel.send('Properties of bank'+step,'.');
      message.channel.send('Type: '+data[step].type+', Clock: '+data[step].clockSpeed+'GHz'+', Size: '+data[step].size/1000000000+'GB')
    }
  })
si.mem()
  .then(data => {
    message.channel.send(data.total/1000000000+'GB of RAM total, with',data.free/1000000000+'GB available.')
  })
si.osInfo()
  .then(data => {
    message.channel.send('Using OS: '+data.distro+" "+data.release)
  })
  };


module.exports.help = {
  name: "sysinfo",
  description: "Get system info",
  usage: "sysinfo",
};
