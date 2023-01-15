const { SlashCommandBuilder } = require("discord.js")

module.exports = {

  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Hallo!"),
  async execute(interaction) {
    interaction.reply("Servus!")
  }

}