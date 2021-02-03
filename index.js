const Discord = require("discord.js"), fs = require("fs"), config = require("./config.json"); // Get all the requirements
const discord = require('discord.js')
const { bot_token, config_owner, prefix, hd, hj, ServerID } = require('./config.json')  // Get the config.json file into the main file
const profanity = require('./profanity.json'); // assuming this is an array of words. for the blacklist word filter and snipe filter
const client = new Discord.Client({ messageSweepInterval: 60, disableEveryone: true }) // Create a client
const queue = new Map(); // This will be needed for a queue

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

client.commands = new Discord.Collection(); // Creates a code collection

client.on("ready", async () => { // Logs response when started
  console.log(`Thanks Germ. And yes, your humour is bad. `);
});

let commands = {} // A bit of pre-work to set all things up
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  console.log(files)
  for (var file of files) if (file.endsWith(".js")) {
    commands[file.replace(".js", "")] = `./commands/${file}`;
    let props = require(`./commands/${file}`);
    client.commands.set(props.help.name, props);
  }
});

client.on("message", async message => {
  if (!message.guild || message.author.bot) return;

  if (message.content.startsWith(prefix) || message.content.match(`^<@!?${client.user.id}> `)) {
    let args = message.content.split(" ");
    if (args[0].match(`^<@!?${client.user.id}>`)) args.shift(); else args[0] = args[0].slice(prefix.length);
    let command = args.shift().toLowerCase()

    if (commands[command]) try {
      let commandFile = require(commands[command])

      if (getPermissionLevel(message.member) < commandFile.permissionRequried) return message.channel.send(`❌ You don't have permission! For help type \`${prefix}help\`.`); // Starting some basic commands.
      commandFile.run(client, message, args, config, queue)
    } catch(e) {}
  } else if (message.content.match(`^<@!?${client.user.id}>`)) return message.channel.send(`👋 My prefix is \`${prefix}\`. Commands are ${Object.keys(commands).map(c => `\`${prefix}${c}\``).join(", ")}.`); // Says this when pinged.
})

let getPermissionLevel = (member) => { // Sets up perms
  if (config_owner == member.user.id) return 2;
  if (member.hasPermission("MANAGE_MESSAGES")) return 1;
  return 0;
}

client.on("ready", () => {
console.log("gonna be like calum. don't mind me. ok dnd is on.")

client.user.setPresence({status: "dnd"})
})

client.on("channelDelete", (channel) => {
    if(channel.parentID == channel.guild.channels.cache.find((x) => x.name == "MODMAIL").id) {
        const person = channel.guild.members.cache.find((x) => x.id == channel.name)

        if(!person) return;
        let yembed = new discord.MessageEmbed()
        .setAuthor("Thread deleted", client.user.displayAvatarURL())
        .setColor(RandColor)
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription("Your thread was deleted. If you wish to re-open it or start a new thread, DM me again.")
    return person.send(yembed)
    
    }


})

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.guild.id != ServerID) return;
  let args = message.content.slice(prefix.length).split(' ');
  let command = args.shift().toLowerCase();

  if(message.guild) {
      if(command == "setup") {
          if(!message.member.hasPermission("ADMINISTRATOR")) {
              return message.channel.send("You need Admin Permissions to setup the modmail system!")
          }

          if(!message.guild.me.hasPermission("ADMINISTRATOR")) {
              return message.channel.send("The bot needs Admin Permissions to setup the modmail system!")
          }


          let role = message.guild.roles.cache.find((x) => x.name == "admin" || x.name ===  "mod")
          let everyone = message.guild.roles.cache.find((x) => x.name == "@everyone")

          await message.guild.channels.create("MODMAIL", {
              type: "category",
              topic: "All the threads will be here",
              permissionOverwrites: [
                  {
                      id: role.id,
                      allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                  }, 
                  {
                      id: everyone.id,
                      deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                  }
              ]
          })

          return message.channel.send("Setup is completed. ||Swagitty swagatta I'm the swag attack.||").then((sentMessage) => sentMessage.edit("Setup is completed."))

      } else if(command == "close") {

        if(message.channel.parentID == message.guild.channels.cache.find((x) => x.name == "MODMAIL").id) {
            
            const person = message.guild.members.cache.get(message.channel.name)

            if(!person) {
                return message.channel.send("I am unable to close this channel, if this issue persists please delete it **manually**.")
            }

            await message.channel.delete()

            let yembed = new discord.MessageEmbed()
            .setAuthor("Thread closed", client.user.displayAvatarURL())
            .setColor(RandColor)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription("Thread is closed by " + message.author.username)
            if(args[0]) yembed.setDescription(args.join(" "))

            return person.send(yembed)

        }
      } else if(command == "open") {
          const category = message.guild.channels.cache.find((x) => x.name == "MODMAIL")

          if(!category) {
              return message.channel.send("Modmail system is not setup in this server, use &setup")
          }

          if(!message.member.roles.cache.find((x) => x.name == "Head of Staff (HoS)" || x.name ===  "Admins" || x.name ===  "Bot Maintainer" || x.name ===  "Head Moderator" || x.name === "Moderators")) {
              return message.channel.send("You need a role with the correct permissions to use this command")
          }

          if(isNaN(args[0]) || !args.length) {
              return message.channel.send("Please Give the ID of the person")
          }

          const target = message.guild.members.cache.find((x) => x.id === args[0])

          if(!target) {
              return message.channel.send("Unable to find this person.")
          }

          const channel = await message.guild.channels.create(target.id, {
              type: "text",
            parent: category.id,
            topic: "Thread is opened by **" + message.author.username + "** to contact " + message.author.tag
          })

          let nembed = new discord.MessageEmbed()
          .setAuthor("Details", target.user.displayAvatarURL({dynamic: true}))
          .setColor(RandColor)
          .setThumbnail(target.user.displayAvatarURL({dynamic: true}))
          .setDescription(message.content)
          .addField("Name", target.user.username)
          .addField("Account Creation Date", target.user.createdAt)
          .addField("Contact", "(Opened by a staff member.)");

          channel.send(nembed)

          let uembed = new discord.MessageEmbed()
          .setAuthor("Contact thread open")
          .setColor(RandColor)
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription("You have been contacted by a staff member, please wait until they send another message to you!");

          target.send(uembed);

          let newEmbed = new discord.MessageEmbed()
          .setDescription("Opened The thread: <#" + channel + ">")
          .setColor(RandColor);

          return message.channel.send(newEmbed);
      } else if(command == "help") {
          let embed = new discord.MessageEmbed()
          .setAuthor('Unovan Modmail', client.user.displayAvatarURL())
          .setColor(RandColor)
        
        .addField(hd + "Modmail" + hj, 'Modmail commands')

        .addField(prefix + "close", "Closes a modmail thread")
  
        .addField(prefix + "open", 'Let you open the thread to contact anyone with their ID')

        .addField(hd + "Music" + hj, 'Music commands')

        .addField(prefix + "np", 'Shows the currently playing song')

        .addField(prefix + "pause", 'Pauses the currently playing song')

        .addField(prefix + "play", 'Plays a song, either with URL or key words')

        .addField(prefix + "queue", 'Displays the current queue')

        .addField(prefix + "resume", 'Resumes the playing of a song')

        .addField(prefix + "skip", 'Skips the currently playing song')

        .addField(prefix + "stop", 'Disconnects the bot from the VC')

        .addField(prefix + "volume", 'Changes the bot\'s music volume')

        .addField(hd + "Utilities" + hj, 'Utility commands')

        .addField(prefix + "help", 'Displays the bot\'s commands')
        
        .addField(prefix + "ping", 'Shows the bot\'s ping')

        .addField(hd + "Misc." + hj, 'Miscellaneous/Special Commands')

        .addField(prefix + "van", 'Yes, you can *van* someone.')

        .addField(prefix + "8ball", 'Ask a question')

        .addField(prefix + "snipe", '~~Shoot someone~~ Revive deleted messages')

        .addField(prefix + "meme", 'Get a meme')

        .addField(prefix + "esnipe", "Non-existent command, probably won't come to fruition")

        .addField(prefix + "warm", 'Warm someone')

        .addField(prefix + "cool", 'Cool someone')

        .addField(prefix + "mcfetch", 'Fetch status of Minecraft servers')

        .setThumbnail(client.user.displayAvatarURL());

        message.react('📥');
        return message.author.send(embed)
          
      }
  } 



  if(message.channel.parentID) {

    const category = message.guild.channels.cache.find((x) => x.name == "MODMAIL")
    
    if(message.channel.parentID == category.id) {
        let member = message.guild.members.cache.get(message.channel.name)
    
        if(!member) return message.channel.send('Unable To Send Message')
    
        let lembed = new discord.MessageEmbed()
        .setColor(RandColor)
        .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(message.content)
    
        return member.send(lembed)
    }
    
    
      } 

  if(!message.guild) {
      const guild = await client.guilds.cache.get(ServerID) || await client.guild.fetch(ServerID).catch(m => {})
      if(!guild) return;
      const category = guild.channels.cache.find((x) => x.name == "MODMAIL")
      if(!category) return;
      const main = guild.channels.cache.find((x) => x.name == message.author.id)

      if(!main) {
          let mx = await guild.channels.create(message.author.id, {
              type: "text",
              parent: category.id,
              topic: "This thread is created for helping  **" + message.author.tag + " **"
          })

          let sembed = new discord.MessageEmbed()
          .setAuthor("Thread created")
          .setColor(RandColor)
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription("Thread is now created, you will be contacted by staff soon.")

          message.author.send(sembed)

          let eembed = new discord.MessageEmbed()
          .setAuthor("DETAILS", message.author.displayAvatarURL({dynamic: true}))
          .setColor(RandColor)
          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
          .addField("Reason", message.content)
          .addField("Name", message.author.username)
          .addField("Account Creation Date", message.author.createdAt)

        return mx.send(eembed)
      }

      let xembed = new discord.MessageEmbed()
      .setColor(RandColor)
      .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(message.content)

      main.send(xembed)

  } 

})

//  llsc12's code :D

const deletedMessages = new Discord.Collection();

client.on('message', async message => {
  if (message.author.bot) return;

  const args = message.content.trim().split(/\s+/g);
  const command = args.shift().toLowerCase();

  switch (command) {
    case '&snipe':

      const msg = deletedMessages.get(message.channel.id);
      if (!msg) return message.reply('Could not find any deleted messages in this channel.');

        if (msg.content) {
      const isProfane = !!profanity.find((word) => {
      const regex = new RegExp(`\\b${word}\\b`, 'i'); // if the phrase is not alphanumerical,
      return regex.test(msg.content);             // you may need to escape tokens
      });
      if (isProfane) {
            if (message.author.id == 381538809180848128) {
              const embed = new Discord.MessageEmbed()
              .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }))
              .setDescription(msg.content)
              .setColor(RandColor);
              message.channel.send(embed).catch(err => console.error(err));
            } else {
              const embed = new Discord.MessageEmbed()
              .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }))
              .setDescription('Message blocked by word filter.')
              .setColor(RandColor);
              message.channel.send(embed).catch(err => console.error(err));
            }
          }
      else {
      const embed = new Discord.MessageEmbed()
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }))
      .setDescription(msg.content)
      .setColor(RandColor);
      message.channel.send(embed).catch(err => console.error(err));
      }}
    
}});

client.on('messageDelete', message => {
  if (message.author.bot) return;
  deletedMessages.set(message.channel.id, message);
  const msg = deletedMessages.get(message.channel.id);
  console.log('====================')
  console.log(msg.author.tag+"'s message was deleted.")
  console.log(msg.content);
});

const activities_list = require('./statuses.json');// Activity array

client.on('ready', () => {
  setInterval(() => {
      const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
      client.user.setActivity(activities_list[index], { type: 'PLAYING' }); // sets to one of any in array
  }, 7000); // Runs this every 7 seconds.
  
});


client.on("message", async message => { // rules sending system. like .r1 and stuff
  if(message.author.bot) return;
  if(message.guild.id != '758016990567858187') return;

  let command = message.content

  if (command == (".r1")) {
    const rembed = new Discord.MessageEmbed()
    .setColor(RandColor)
    .setDescription(`Racism is absolutely not tolerated in this server. Use of it is an insta warn no matter whether it's "a joke" or not.`)
    .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(rembed).catch(err => console.error(err));
  } else if (command == '.r2') {
    const rembed = new Discord.MessageEmbed()
    .setColor(RandColor)
    .setDescription('Do not be outright toxic to anyone. Seen once is a verbal warning, second is an actual warning.')
    .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(rembed).catch(err => console.error(err));
  } else if (command == '.r3') {
    const rembed = new Discord.MessageEmbed()
    .setColor(RandColor)
    .setDescription(`If a member states they do not want to be pinged, do not ping them. If you are there at the time they state they don't want to be pinged, you will be issued a warn. If you aren't there or didn't notice, you will receive a verbal warning and then a warn if done again.`)
    .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(rembed).catch(err => console.error(err));
  } else if (command == '.r4') {
    const rembed = new Discord.MessageEmbed()
    .setColor(RandColor)
    .setDescription('Advertising is a straight no. Straight warn if seen and advertisement will be removed.')
    .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(rembed).catch(err => console.error(err));
  } else if (command == '.r5') {
    const rembed = new Discord.MessageEmbed()
    .setColor(RandColor)
    .setDescription('No having your whole username contain special characters. Being unpingable is extremely annoying. If you have a name like this, you will be asked to change it. If you refuse, you will be warned and have your name changed by a staff member.')
    .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(rembed).catch(err => console.error(err));
  } else if (command == '.r6') {
    const rembed = new Discord.MessageEmbed()
    .setColor(RandColor)
    .setDescription('Bot commands not allowed anywhere except #〈🤖〉commands. The commands allowed anywhere are ?afk, ?whois, Memer commands and &warm, &cool, &van, &snipe and other fun commands.')
    .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(rembed).catch(err => console.error(err));
  } else if (command == '.r7') {
    const rembed = new Discord.MessageEmbed()
    .setColor(RandColor)
    .setDescription('All nsfw is to be kept in #〈🔞〉nsfw. I doubt everybody wants to see what you shady people post. Warn if seen outside of this channel.')
    .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(rembed).catch(err => console.error(err));
  } else if (command == '.r8') {
    const rembed = new Discord.MessageEmbed()
    .setColor(RandColor)
    .setDescription('Do not disrespect someone because of their sexuality or beliefs. As our community expands, we will get many different types of people, with different points of view and sexuality. You guys must learn to accept this - not disrespect this.')
    .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(rembed).catch(err => console.error(err));
  } else if (command == '.r9') {
    const rembed = new Discord.MessageEmbed()
    .setColor(RandColor)
    .setDescription('Staff will now be using statuses to signify whether they are free or not.')
    .addField('Green','Free to help you.')
    .addField('Orange','They are AFK.')
    .addField('Red','Do not disturb them.')
    .addField('Offline',' Offline')
    .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(rembed).catch(err => console.error(err));
  } else if (command == '.gaia') {
    const rembed = new Discord.MessageEmbed()
    .setColor(RandColor)
    .setDescription('Please refrain from mentioning "Gaia, gaia wars, reforged", etc.')
    .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(rembed).catch(err => console.error(err));
  } else if (command == '.r10') {
    const rembed = new Discord.MessageEmbed()
    .setColor(RandColor)
    .setDescription('You are not entitled to anything. If you think otherwise, please leave.')
    .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(rembed).catch(err => console.error(err));
  } else if (command == '.r11') {
    const rembed = new Discord.MessageEmbed()
    .setColor(RandColor)
    .setDescription("Keep it chill in chat. If you're being generally unpleasant, you may be subject to moderator action.")
    .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(rembed).catch(err => console.error(err));
  } else if (command == '.r12') {
    const rembed = new Discord.MessageEmbed()
    .setColor(RandColor)
    .setDescription("Server staff has the final say in moderation decisions. That's why they're staff. To appeal a moderation decision, please DM a staff member or send a Modmail via our bot.")
    .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(rembed).catch(err => console.error(err));
  } else if (command == '.r13') {
    const rembed = new Discord.MessageEmbed()
    .setColor(RandColor)
    .setDescription("Do not beg/plead for any role or extra permissions.")
    .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(rembed).catch(err => console.error(err));
  } else if (command == '.r14') {
    const rembed = new Discord.MessageEmbed()
    .setColor(RandColor)
    .setDescription("No loopholing through word filters, they exist for a reason. Same goes for rules, don't find loopholes through them.")
    .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(rembed).catch(err => console.error(err));
  } else if (command == '.r15') {
    const rembed = new Discord.MessageEmbed()
    .setColor(RandColor)
    .setDescription("For god's sake, this is an online Discord server. don't take everything too seriously, or get too offended.")
    .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(rembed).catch(err => console.error(err));
  } else if (command == '.r34') {
    const rembed = new Discord.MessageEmbed()
    .setColor(RandColor)
    .setDescription("Oi cunt im not a porn bot")
    .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(rembed).catch(err => console.error(err));
  } else if (command == '.r63') {
    const rembed = new Discord.MessageEmbed()
    .setColor(RandColor)
    .setDescription("Oi cunt im not a porn bot")
    .setFooter('Requested by '+message.author.tag, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(rembed).catch(err => console.error(err));
  }
});

client.on('message', (message) => {
  if (message.content) {
    const profane = !!profanity.find((word) => {
      const regex = new RegExp(`\\b${word}\\b`, 'i'); // if the phrase is not alphanumerical,
      return regex.test(message.content);             // you may need to escape tokens
    });
    if (profane) {
      if (message.author.id == 381538809180848128) return;
      if (message.author.id == 549604509614211073) return;  //Don't delete if the message author's id is one of these
      if (message.author.id == 384477573314510850) return;

      return message.delete()
      .catch(err => console.err);
      }
    }
});

//  end of llsc12's code :(

client.login(bot_token) //Connects to bot

// -----------------------------------------------------------------------------------------------------------------------------

// Part of this code is pulled from a friend's code and from dependencies. The bot and the code was entirely created by me though

// ------------------------------------------------------------------------------------------------------------------------------

// MIT License

// Copyright (c) 2021 scrubbingthegerm

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
