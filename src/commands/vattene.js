const { SlashCommandBuilder } = require('discord.js');
const { VoiceConnectionStatus, AudioPlayerStatus } = require('@discordjs/voice');
const { joinVoiceChannel } = require('@discordjs/voice');
const { createAudioPlayer } = require('@discordjs/voice');
const { createAudioResource, StreamType } = require('@discordjs/voice');
const { NoSubscriberBehavior } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('vattene')
		.setDescription('Vo via, vo via...'),
	async execute(interaction, client) {
        const voiceChannel = interaction.member.voice.channel;
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });
        connection.destroy();
        await interaction.reply('Non stavo facendo nullaaa');

    },



}