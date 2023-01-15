const { GuildMember, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  /**
   * @param {GuildMember} member 
   */
  execute(member) {
    member.guild.channels.cache.get(process.env.DISCORD_GUILD_ID).send({
      embeds: [
        new EmbedBuilder()
          .setTitle("Willkommen auf dem Bodybuilding Server")
          .setDescription(`${member.toString()} ist dem Server beigetreten!`)
          .setThumbnail(member.user.displayAvatarURL())
          .setColor("BLURPLE")
      ]
    })
  }
}