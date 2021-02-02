const Discord = require("discord.js")
const client = new Discord.Client({ messageSweepInterval: 60, disableEveryone: true }) // Create a client
module.exports.run = async (bot, message, args) => {
    if (message.author.bot) return;
    if (message.author.id != 381538809180848128) return;
    message.delete();
    var serverrulesembed = new Discord.MessageEmbed()
    .setAuthor('Server Rules') //Page 1 :/
    .setDescription("These are Unovan Legends' rules, please follow them", "Breaking the rules may result in punishment.")
    .setColor(args[0])
    .addField("1) **Racism**","Racism is absolutely not tolerated in this server. Use of it is an instant warn no matter whether it's 'a joke' or not.")
    .addField("_ _","_ _")
    .addField("2) **Toxicity**","Do not be outright toxic to anyone. Seen once by staff is a verbal warning, second time will be an actual warning.")
    .addField("_ _","_ _")
    .addField("3) **Pinging**","If a member states they do not want to be pinged, do not ping them. If you are there at the time they state they don't want to be pinged, you will be issued a warn. If you aren't there or didn't notice, you will receive a verbal warning and then a warn if done again.")
    .addField("_ _","_ _")
    .addField("4) **Advertising**","Advertising is not allowed anywhere on this server. Immediate warn if seen by staff and advertisement will be removed.")
    .addField("_ _","_ _")
    .addField("5) **Usernames**","No having your whole username contain special characters. Being unpingable is extremely annoying. If you have a name like this, you will be asked to change it. If you refuse, you will be warned and have your name changed by a staff member.")
    .addField("_ _","_ _")
    .addField("6) **Bot Commands**","Not allowed anywhere except #〈🤖〉commands.")
    .addField("_ _","_ _")
    .addField("Some commands can be used every 10 mins. Allowed commands are", "?afk, ?whois, Memer commands and &warm, &cool, &van, &snipe and other fun commands.")
    .addField("_ _","_ _")
    .addField("7) **NSFW**","All nsfw is to be kept in #〈🔞〉nsfw. Most people don't want to see what you shady people post. Instant warn if seen outside of #〈🔞〉nsfw. Also, please use appropriate names and profile pictures.")
    .addField("_ _","_ _")
    .addField("8) **Homophobia**","Do not disrespect someone because of their sexuality or beliefs. As our community expands, we will get many different types of people, with different points of view and sexuality. You guys must learn to accept this - not disrespect this.")
    .addField("_ _","_ _")
    .addField("9) **Status**","Staff will now be using statuses to signify whether they are free or not.")
    .addField("_ _","_ _")
    .addField('Green','Free to help you.')
    .addField('Orange','They are AFK.')
    .addField('Red','Do not disturb them.')
    .addField('Offline',' Offline')
    message.channel.send(serverrulesembed);
    
    var serverrulesembed = new Discord.MessageEmbed() //page 2 :/
    .setColor(args[0])
    .addField("_ _","Pinging any staff on Red status in particular will land you a warn, as they are not fit to handle any situations right now, or may be busy.")
    .addField("_ _","_ _")
    .addField("**Rule Reference in-chat**","You can refer to the rules at any time when the <@!784095503591014441> bot is online, by doing .r(rule number) in the chat. For example, if you need to see Rule 1, do .r1")
    .addField("_ _","_ _")
    .addField("**~~Bowling Alley Scoreboard~~ Warn System**","_ _")
    .addField("1 Warn","Nothing")
    .addField("2 Warn","30 minute mute")
    .addField("3 Warn","1 hour mute")
    .addField("4 Warn","2 hour mute")
    .addField("5 Warn","4 hour mute")
    .addField("6 Warn","12 hour mute")
    .addField("7 Warn","24 hour mute and Image Perms will be removed")
    .addField("8 Warn","Permanent Ban")
    .addField("_ _","_ _")
    .addField("10) **Self-entitlement**","You are not entitled to anything. If you think otherwise, please leave.")
    .addField("_ _","_ _")
    .addField("11) **No spamming**","Keep it chill in chat. If you're being generally unpleasant, you may be subject to moderator action.")
    .addField("_ _","_ _")
    .addField("12) **Respect decisions of staff**","Server staff has the final say in moderation decisions. That's why they're staff. To appeal a moderation decision, please DM a staff member or send a Modmail via our bot.")
    .addField("_ _","_ _")
    .addField("13) **No Begging**","Do not beg/plead for any role or extra permissions.")
    .addField("_ _","_ _")
    .addField("14) **No Loopholing**","No loopholing through word filters, they exist for a reason. Same goes for rules, don't find loopholes through them.")
    .addField("_ _","_ _")
    .addField("15) No Drama","For god's sake, this is an online Discord server. don't take everything too seriously, or get too offended.")
    message.channel.send(serverrulesembed);

};

module.exports.help = {
    name: "rules",
    description: "rules posting system",
    usage: "rules",
};
