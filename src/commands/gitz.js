import { SlashCommandBuilder, ChannelType } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gitz')
        .setDescription('Join the channel where the user who sent the message is in ')
        .addChannelOption(option => option.addChannelTypes(ChannelType.GuildVoice)),
    async execute(interaction) {
        console.log(interaction.member);
        console.log(interaction.member.presence);
        console.log(interaction.member.presence.status);
    },
}