const Discord = require('discord.js')
const { config } = require('dotenv')
const { Client, GatewayIntentBits, Partials, ActivityType } = require('discord.js');
const { ButtonStyle } = require('discord.js');
config({
    path: __dirname + "/.env"
});
const Temp = new Map();
const { glob } = require("glob");
const { promisify } = require('util')
const globPromise = promisify(glob);
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    partials: [
        Partials.Channel
    ]
});

client.on('ready', async () => {
    const servers = await client.guilds.fetch()
    servers.forEach(async guild => {
        console.log(`${guild.name} ${guild.id}`)
    })
    console.log(`${client.user.tag} is ready!`)


    const users = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
    function kFormatter(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
    }

    let status = `${kFormatter(users)} users 👀`
    client.user.setPresence({
        activities: [{ name: `${status}`, type: ActivityType.Watching }],
        status: 'online',
    });
    setInterval(async () => {
        let status = `${kFormatter(users)} users 👀`
        client.user.setPresence({
            activities: [{ name: `${status}`, type: ActivityType.Watching }],
            status: 'online',
        });
    })

})
client.on(`guildCreate`, async guild => {
    const channel = guild.channels.fetch(`995759386662277211`)
    channel.send(`Hey <@437371161974931466>! I am Hedge Developments mascot!`)
})
client.on('messageCreate', async message => {
    try {
        const moment = require('moment')
        const timestamp = '1673990075'
        const time = moment.unix(timestamp).format('MMMM Do YYYY');
        const fromNow = moment.unix(timestamp).fromNow();
        if (message.content.toLowerCase().includes('hedge hog') && (message.content.toLowerCase().includes('born') || message.content.toLowerCase().includes('made'))) {
            message.reply(`I was born on ${time}! \`${fromNow}\``)
        }
    } catch (err) {
        console.log(err)
    }
})

client.login(process.env.TOKEN)
