/**
 * Author: Condotti
 * Description: https://discordjs.guide/creating-your-bot/main-file.html#running-your-application
 */
const {token} = require("./../config/config.json");
const { Client, Events, GatewayIntentBits } = require('discord.js');


const client = new Client({
    "intents": [GatewayIntentBits.Guilds]
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, function(clientsEventObj){
    console.log('Ready!  Logged in as ' + clientsEventObj.user.tag);
});

// Log in to Discord with your client's token
client.login(token);