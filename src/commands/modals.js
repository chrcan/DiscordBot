const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Liefert ein Modal"),
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const modal = new ModalBuilder()
        .setCustomId(`embedModal`)
        .setTitle(`Fav Color?`)

      const textInput = new TextInputBuilder()
        .setCustomId(`favColorInput`)
        .setLabel(`Why is your fvorite color?`)
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

      modal.addComponents(new ActionRowBuilder().addComponents(textInput));

      await interaction.showModal(modal);

    } else if (interaction.type == InteractionType.ModalSubmit) {
      const { modals } = client;
      const { customId } = interaction;
      const modal = modals.get(customId);
      if (!modal) return new Error("There is no code fore this modal.");
      try {
        await modal.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    }
  }
}