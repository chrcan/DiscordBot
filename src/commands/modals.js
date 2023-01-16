const { SlashCommandBuilder } = require('@discordjs/builders');
const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

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
      .setLabel("Provide us with your name")
      .setStyle(TextInputStyle.Short);

    const about = new TextInputBuilder()
      .setCustomId("about")
      .setRequired(true)
      .setLabel("Provide us with short essay about you")
      .setStyle(TextInputStyle.Paragraph);

    const firstActionRow = new ActionRowBuilder().addComponents(name)
    const secondActionRow = new ActionRowBuilder().addComponents(about)

    modal.addComponents(firstActionRow, secondActionRow)
    interaction.showModal(modal)

  }
}
/*
module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Liefert ein Modal"),
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const modal = new ModalBuilder()
        .setCustomId("embedModal")
        .setTitle("Bevorzugte Farbe?")

      const textInput = new TextInputBuilder()
        .setCustomId("favColorInput")
        .setLabel("Was ist deine lieblings Farbe?")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

      modal.addComponents(new ActionRowBuilder().addComponents(textInput));

      await interaction.showModal(modal);

    } else if (interaction.type == InteractionType.ModalSubmit) {
      const { modals } = client;
      const { customId } = interaction;
      const modal = modals.get(customId);
      if (!modal) return new Error("Für dieses Modal gibt es keinen Code.");
    }
  }
}
*/