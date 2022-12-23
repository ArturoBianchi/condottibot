const {Client, GatewayIntentBits, Collection, Events} = require("discord.js");
const {Player} = require("discord-player");
const path = require("node:path");
const fs = require("node:fs");

module.exports = class BotClient {
    #commandsDir;
    #originalClientObj;
    #addPlayerFlag

    /**
     * Constructor
     * @param dir
     * @param addPlayer
     */
    constructor(dir, addPlayer) {
        this.#commandsDir = dir;
        this.#addPlayerFlag = addPlayer
        this.#init();
    }

    /**
     * Getter #originalClientObj (JSON)
     * @returns {*}
     */
    get orinalClientObj(){
        return this.#originalClientObj.toJSON();
    }

    /**
     * Getter #commands (string)
     * @returns {*}
     */
    get commandsDir(){
        return this.#commandsDir;
    }

    /**
     * Init Client object
     */
    #init(){
        const client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildMessages
            ]
        });
        client.commands = new Collection();
        this.#initCommandsCollection(client);
        this.#addPlayerToClient(client)
        this.#originalClientObj = client;
    }

    /**
     * Add commands to client collection
     * @param client
     */
    #initCommandsCollection(client){
        const commandsPath = path.join(__dirname, '..', this.#commandsDir);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log('[WARNING] The command at' + filePath + 'is missing a required "data" or "execute" property.');
            }
        }
    }

    /**
     * Add Player obj. to client. Used to connecto to a voice channel and play tracks.
     */
    #addPlayerToClient(client){
        client.player = new Player(client, {
            ytdlOptions: {
                quality: "highestaudio",
                highWaterMark: 1 << 25
            }
        });
    }

    /**
     * Login interface method
     */
    doLogin(){
        this.#originalClientObj.login();
    }

    addInteractionEventsForCommands(){
        this.#originalClientObj.on(Events.Igit nteractionCreate, this.#onInteractionEvent);
    }

    /**
     *
     * @param interaction
     * @returns {Promise<void>}
     */
    async #onInteractionEvent(interaction){
        if (!interaction.isChatInputCommand()){
            new Error('Not an allowed command')
        }else{
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
            }else{
                try {
                    await command.execute(interaction, client);
                } catch (error) {
                    console.error(error);
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        }
    }
}