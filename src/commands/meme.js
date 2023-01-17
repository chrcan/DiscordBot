const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const fetch = require('node-fetch')

// const fetch = require('node-fetch')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Holen dir ein Meme!"),
  async execute(interaction) {

    async function meme() {
      await fetch('https://www.reddit.com/r/memes/random/.json')
        .then(async res => {
          let meme = await res.json();

          //console.log(meme);

          let title = meme[0].data.children[0].data.title;
          let image = meme[0].data.children[0].data.url;
          let author = meme[0].data.children[0].data.author;

          const embed = new EmbedBuilder()
            .setColor("Yellow")
            .setTitle(`${title}`)
            .setImage(`${image}`)
            .setURL(`${image}`)
            .setFooter({ text: author })

          await interaction.reply({ embeds: [embed] });
        });
    }
    meme();
  }
}