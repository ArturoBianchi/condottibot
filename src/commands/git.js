const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('git')
		.setDescription('Zitta troia'),
	async execute(interaction, client) {
        //interaction.member.voice.channel;
        //const isReady = true;
        const voiceChannel = interaction.member.voice.channel;
        console.log(voiceChannel);
        voiceChannel.join().then(connection =>{
            const dispatcher = connection.play('./condox.mp3');
            dispatcher.on("end", end => {
                voiceChannel.leave();
            });
        }).catch(err => console.log(err));
		await interaction.reply('OIOI');
	},
}