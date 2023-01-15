const { GuildMember, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  /**
   * @param {GuildMember} member 
   */
  execute(member) {
    member.guild.channels.cache.get(process.env.DISCORD_GUILD_ID).send({
      embeds: [
        // für discord.js@13.9.0
        //new MessageEmbed()
        // für discord.js@14.7.1
        new EmbedBuilder()
          .setTitle("Willkommen auf dem Bodybuilding Server")
          .setDescription(`${member.toString()} ist dem Server beigetreten!`)
          .setThumbnail(member.user.displayAvatarURL())
          .setColor("BLURPLE")
      ]
    })
  }
}