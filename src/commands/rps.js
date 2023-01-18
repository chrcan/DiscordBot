const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ssp")
    .setDescription("Stein Schere Papier!"),
  async execute(interaction) {
    let hand = [
      {
        txt: 'Stein',
        emoji: '✊',
        index: 0
      },
      {
        txt: 'Papier',
        emoji: '🤚',
        index: 0
      },
      {
        txt: 'Schere',
        emoji: '✌️',
        index: 0
      },
    ];

    let botMove = hand[Math.floor(Math.random() * 3)];

    const sspMsg = await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('0x0099FF')
          .setTitle('Stein Schere Papier')
          .setDescription('Wähle ein Handzeichen aus!')
          .setImage('https://static.vecteezy.com/system/resources/previews/000/691/497/non_2x/rock-paper-scissors-neon-icons-vector.jpg')
      ],
      components: [
        new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('ssp_rock')
              .setLabel('✊ Stein')
              .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
              .setCustomId('ssp_scissors')
              .setLabel('✌️ Schere')
              .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
              .setCustomId('ssp_paper')
              .setLabel('🤚 Papier')
              .setStyle(ButtonStyle.Primary),
          )
      ],
      fetchReply: true
    });

    let win = 0;
    let userMove;

    const filter = interaction => !interaction.user.bot;
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      componentType: ComponentType.Button,
      time: 1000
    });

    collector.on('collect', async (i) => {
      if (!i.isButton()) return;

      if (i.customId.startsWith('ssp')) {
        await i.deferUpdate();
        let move = i.customId.split('_')[1]
        userMove = hand.find(v => v.txt.toLowerCase() == move);

        switch (move) {
          case 'stein':
            win = botMove.index == 0 ? 1 : (botMove.index == 1 ? 0 : 2);
            break;
          case 'schere':
            win = botMove.index == 0 ? 0 : (botMove.index == 1 ? 2 : 1);
            break;
          case 'papier':
            win = botMove.index == 0 ? 2 : (botMove.index == 1 ? 1 : 0);
            break;
        }

        let einbettung = sspMsg.embeds[0]
        einbettung.color = 'BLUE';
        einbettung.description = `Ich wählte ${botMove.txt}! ${win == 0 ? 'Du hast verloren!' : (win == 1 ? 'Wir treiben!' : 'Du hast gewonnen')} (${userMove.emoji} ${win == 0 ? '<' : (win == 1 ? '=' : '>')} ${botMove.emoji})`;

        let components = sspMsg.components

        components[0].components.forEach(comp => {
          if (comp.customId == i.customId) {
            comp.disabled = true;
            comp.style = ButtonStyle.Primary;
          } else comp.disabled = true;
        });

        await sspMsg.edit({ embeds: [einbettung], components: components, fetchReply: true });

        collector.stop()
      }
    });
  },
};