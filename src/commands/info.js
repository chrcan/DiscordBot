const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Zeige Informationen über den Server oder einen User an")
    //.addStringOption(option => option.setName("test").setDescription("test").setRequired(true)),
    .addSubcommand(subCommand => subCommand.setName("server").setDescription("Zeige Informationen über den Server an."))
    .addSubcommand(subCommand => subCommand.setName("member").setDescription("Zeige Informationen über einen Member an.")
      .addUserOption(option => option.setName("member").setDescription("Der Member").setRequired(true))),
  async execute(interaction) {
    switch (interaction.options.getSubcommand()) {
      case "server": {
        interaction.reply({
          embeds: [
            // für discord.js@13.9.0
            //new MessageEmbed()
            // für discord.js@14.7.1
            new EmbedBuilder()
              .setTitle(`Informationen für die Guild ${interaction.guild.name}`)
              .addFields([
                {
                  name: "Channels",
                  value: `${interaction.guild.channels.cache.size} Channels`
                },
                {
                  name: "Erstellt",
                  value: `<t:${Math.round(interaction.guild.createdTimestamp / 1000)}>`,
                  inline: true
                }
              ])
          ]
        })
        break
      }

      case "member": {
        const member = interaction.options.getMember("member")
        interaction.reply({
          embeds: [
            // für discord.js@13.9.0
            //new MessageEmbed()
            // für discord.js@14.7.1
            new EmbedBuilder()
              .setTitle(`Informationen über ${member.toString()}`)
              .addFields([
                {
                  name: "Account erstellt",
                  value: `<t:${Math.round(member.user.createdTimestamp / 1000)}>`
                },
                {
                  name: "Guild beigetreten",
                  value: `<t:${Math.round(member.joinedTimestamp / 1000)}>`,
                  inline: true
                }
              ])
          ]
        })
        break
      }
    }
  }

}