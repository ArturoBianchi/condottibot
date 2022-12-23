const { SlashCommandBuilder } = require('discord.js');
const { VoiceConnectionStatus, AudioPlayerStatus } = require('@discordjs/voice');
const { joinVoiceChannel } = require('@discordjs/voice');
const { createAudioPlayer } = require('@discordjs/voice');
const { createAudioResource, StreamType } = require('@discordjs/voice');
const { NoSubscriberBehavior } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('git')
		.setDescription('Oggi impareremo...'),
	async execute(interaction, client) {
        const voiceChannel = interaction.member.voice.channel;
        const player = createAudioPlayer();
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });
        const resource = createAudioResource("condox.mp3");
        // Play "track.mp3" across voice connections
        player.play(resource);
        connection.subscribe(player);
		await interaction.reply('OIOI');
	},
}