const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("modal")
    .setDescription("Liefert ein Modal"),
  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId("modal")
      .setTitle("Bodybuilding Modal")

    const name = new TextInputBuilder()
      .setCustomId("name")
      .setRequired(true)
      .setLabel("Nenne Uns deinen Namen")
      .setStyle(TextInputStyle.Short);

    const about = new TextInputBuilder()
      .setCustomId("about")
      .setRequired(true)
      .setLabel("Über deine Person")
      .setStyle(TextInputStyle.Paragraph);

    const author = new TextInputBuilder()
      .setCustomId("author")
      .setLabel("Autor")
      .setStyle(TextInputStyle.Short)
      .setRequired(false)
      .setValue(interaction.user.username)

    modal.addComponents([
      new ActionRowBuilder().addComponents(name),
      new ActionRowBuilder().addComponents(about),
      new ActionRowBuilder().addComponents(author)
    ])

    await interaction.showModal(modal)

    // const firstActionRow = new ActionRowBuilder().addComponents(name)
    // const secondActionRow = new ActionRowBuilder().addComponents(about)
    // modal.addComponents(firstActionRow, secondActionRow)
    // interaction.showModal(modal)

  }
}