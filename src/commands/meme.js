//const { SlashCommandBuilder } = require("@discordjs/builders")
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
//const fetch = require('node-fetch')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// const fetch = require('node-fetch')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Holen dir ein Meme!"),
  async execute(interaction) {
    /*
        async function meme() {
          await fetch('https://api.giphy.com/v1/gifs/random?api_key=CHfe77jLAvosBc1QAtX2Sa4EIMVcKwPP&tag=Bodybuilding&rating=g')
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
        */
    const { guild, options, member } = interaction;

    const embed = new EmbedBuilder();

    async function giphyMeme() {
      await fetch('https://api.giphy.com/v1/gifs/random?api_key=CHfe77jLAvosBc1QAtX2Sa4EIMVcKwPP&tag=Bodybuilding&rating=g').then(async res => {
        let meme = await res.json();

        let title = meme.data.title;
        let url = meme.data.images.original.url;
        let link = meme.data.url;
        let author = meme.data.user.display_name;
        let pf = meme.data.user.avatar_url;

        await interaction.reply({
          embeds: [embed.setTitle(title).setImage(url).setURL(url).setColor("Random").setFooter({ text: author, iconURL: pf })],
        });
      });
    }
    giphyMeme();
  }
}