const Discord = require("discord.js")
const client = new Discord.Client()

const token = "NzI3NzkyMzgxMjkzODg3NTg4.XvzANw.1SbTcNWe07oW7ZFvy6xMcPBmmM0";
client.on('ready', ()=>{
  console.log("IMDb_Bot is running...")
})



client.login(token)
