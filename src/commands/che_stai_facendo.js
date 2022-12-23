const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('che_stai_facendo')
		.setDescription('Condotti! Che stai facendo?'),
	async execute(interaction, client) {
        await interaction.reply('Niente.');
    },
}