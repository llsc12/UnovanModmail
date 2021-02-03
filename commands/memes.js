const https = require('https');
const Discord = require('discord.js');
const url = 'https://www.reddit.com/r/memes/hot/.json?limit=100'

module.exports.run = async (bot, message, args) => {
    const times = x => f => {
        if (x > 0) {
            f()
            times (x - 1) (f)
        }
    }
    if (!args[0]) return message.channel.send('Specify an amount of memes to spam');
    times (args[0]) (() => {
    if (message.author.bot) return;
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
        https.get(url, (result) => {
            var body = ''
            result.on('data', (chunk) => {
                body += chunk
            })

            result.on('end', () => {
                var response = JSON.parse(body)
                var index = response.data.children[Math.floor(Math.random() * 99) + 1].data

                if (index.post_hint !== 'image') {

                    var text = index.selftext
                    const textembed = new Discord.MessageEmbed()
                        .setTitle(subRedditName)
                        .setColor(color)
                        .setDescription(`[${title}](${link})\n\n${text}`)
                        .setURL(`https://reddit.com/${subRedditName}`)

                    message.channel.send(textembed)
                }

                var image = index.preview.images[0].source.url.replace('&amp;', '&')
                var title = index.title
                var link = 'https://reddit.com' + index.permalink
                var subRedditName = index.subreddit_name_prefixed

                if (index.post_hint !== 'image') {
                    var textembed = new Discord.MessageEmbed()
                        .setTitle(subRedditName)
                        .setColor(color)
                        .setDescription(`[${title}](${link})\n\n${text}`)
                        .setURL(`https://reddit.com/${subRedditName}`)

                    message.channel.send(textembed)
                }
                console.log(image);
                var imageembed = new Discord.MessageEmbed()
                    .setTitle(subRedditName)
                    .setImage(image)
                    .setColor(color)
                    .setDescription(`[${title}](${link})`)
                    .setURL(`https://reddit.com/${subRedditName}`)
                message.channel.send(imageembed)
            }).on('error', function (e) {
                console.log('Got an error: ', e)
            })
        })
    });
};

module.exports.help = {
    name: "memes",
    description: "mems",
    usage: "memes <x>",
};