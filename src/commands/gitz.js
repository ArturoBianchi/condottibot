const { SlashCommandBuilder } = require('discord.js');
const { VoiceConnectionStatus, AudioPlayerStatus } = require('@discordjs/voice');
const { joinVoiceChannel } = require('@discordjs/voice');
const { createAudioPlayer } = require('@discordjs/voice');
const { createAudioResource, StreamType } = require('@discordjs/voice');
const { NoSubscriberBehavior } = require('@discordjs/voice');
const path = require("node:path");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gitz')
		.setDescription('Oggi impareremo...'),
	async execute(interaction, client) {
        const voiceChannel = interaction.member.voice.channel;
        const player = createAudioPlayer();
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });

        var absolutePath = path.resolve(__dirname + "/../commands/music/condox.mp3");
        console.log(absolutePath);
        const resource = createAudioResource(absolutePath);
        
        // Play "track.mp3" across voice connections
        player.play(resource);
        connection.subscribe(player);
        
		await interaction.reply('Condo esegue :monkey: , Condo ripete :monkey:. Condo un po triste :crying_cat_face: ');
	},
}