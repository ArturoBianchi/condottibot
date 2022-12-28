const fs = require("node:fs");
const {REST, Routes} = require("discord.js");
const {clientId, guildId} = require("../../config/config.json");
const dotenv = require("dotenv");

module.exports = class Deployer {
    /**
     *
     * @param path
     */
    static deployCommands(path = './commands'){
        let toRet = true;
        try{
            const commands = [];
            console.log(__dirname);
            // Grab all the command files from the commands directory you created earlier
            const commandFiles = fs.readdirSync(__dirname + "/../commands").filter(file => file.endsWith('.js'));

            // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
            for (const file of commandFiles) {
                const command = require(`./../commands/${file}`);
                commands.push(command.data.toJSON());
            }

            //dotenv.config({path: __dirname + "/../../token.env"});
            console.log(process.env.TOKEN);
            // Construct and prepare an instance of the REST module
            const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

            // and deploy your commands!
            (async () => {
                try {
                    console.log(`Started refreshing ${commands.length} application (/) commands.`);

                    // The put method is used to fully refresh all commands in the guild with the current set
                    const data = await rest.put(
                        Routes.applicationGuildCommands(clientId, guildId),
                        { body: commands },
                    );

                    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
                } catch (error) {
                    // And of course, make sure you catch and log any errors!
                    console.error(error);
                }
            })();
        }catch(e){
            console.log("Error while deploying: " + e.message);
            console.log("Trace: \n" + e.stack);
            toRet = false;
        }

        return toRet;
    }
}