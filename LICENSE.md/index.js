const Discord = require('discord.js');
const botconfig = require('./botconfig.json')

const client = new Discord.Client();
const prefix = 'E!'; 

client.on('ready', () =>{
    console.log(`${client.user.username} is now online!`);
    client.user.setPresence({ game: { name: `Being created!`, type: 0} });
});


client.on('message', (message) => {
  let msg = message.content.toUpperCase();
  let sender = message.author;
  let args = message.content.slice(prefix.length).trim().split(' ');
  let cmd = args.shift().toLowerCase();
  
  if(!msg.startsWith(prefix)) return;
  if (message.author.bot) return;
  
  try {
  let commandFile = require(`./commands/${cmd}.js`)
  commandFile.run(client, message, args);
  } catch(e) {
  console.log(e.message);
  message.channel.send('Please send a valid command!')
  .then(msg => {
    msg.delete(3000)
  })
  
  } finally {
  console.log(`${message.author.tag} ran the command: "${cmd}" in the guild: ${message.guild.name}`)
  }

});


client.login(botconfig.token);
