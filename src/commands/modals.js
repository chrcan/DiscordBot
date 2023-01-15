const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');


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