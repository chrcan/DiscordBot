const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
  usage: "Kein Sub-Befehl verfügbar..\n/ssp (Keine Option)",
  data: new SlashCommandBuilder()
    .setName('ssp')
    .setDescription('Spiel Stein-Papier-Schere mit dem Bot'),
  /**
  * @param {ChatInputCommandInteraction} interaction
  *
  */
  async execute(interaction, client) {
    const {
      options, member, user, channel, guild
    } = interaction;

    const Button = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Stein")
          .setStyle("Primary")
          .setEmoji("✊")
          .setCustomId("isRock-Rps"),

        new ButtonBuilder()
          .setLabel("Papier")
          .setStyle("Primary")
          .setEmoji("🤚")
          .setCustomId("isPaper-Rps"),

        new ButtonBuilder()
          .setLabel("Schere")
          .setStyle("Primary")
          .setEmoji("✌️")
          .setCustomId("isScissor-Rps"),
      );

    interaction.deferUpdate;
    const sent = await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('Stein Schere Papier')
          .setDescription("Lasst uns Stein Schre Papier spielen!!\nVerwenden Sie die Schaltfläche unten, um auszuwählen!")
          .setTimestamp()
          .setColor("#FF84C0")
          .setImage('https://static.vecteezy.com/system/resources/previews/000/691/497/non_2x/rock-paper-scissors-neon-icons-vector.jpg')
      ],
      components: [Button]
    });

    let Draw = 0;
    let Wins = 0;
    let Lose = 0;

    let collector = sent.createMessageComponentCollector({
      time: 1000 * 60,
    });

    collector.on("collect",
      async interaction => {
        if (!interaction.customId.includes("-Rps")) return;
        if (interaction.user.id !== member.id) return interaction.reply({
          content: "Sie sind nicht der Benutzer, der die Befehle ausführt!",
          ephemeral: true
        });

        const choice = ["Stein",
          "Papier",
          "Schere"];

        const botChoice = choice[Math.floor(Math.random() * choice.length)];

        if (interaction.customId == "isRock-Rps") {
          if (botChoice == "Stein") {


            Draw++

            interaction.deferUpdate;
            const sent = await interaction.update({
              embeds: [
                new EmbedBuilder()
                  .setTitle('Stein Schere Papier')
                  .setDescription(`\n**Meine Wahlmöglichkeiten**\n:fist: Stein\n\n**Vs**\n\n**Deine Entscheidungen**\n:fist: Stein\n\n**Ergebnis: Zeichnen**`)
                  .setTimestamp()
                  .setColor("#FF84C0")
              ],
              components: [new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setLabel("Stein")
                    .setStyle("Primary")
                    .setCustomId("isRock")
                    .setDisabled(),

                  new ButtonBuilder()
                    .setLabel("Papier")
                    .setStyle("Secondary")
                    .setCustomId("isPaper")
                    .setDisabled(),

                  new ButtonBuilder()
                    .setLabel("Schere")
                    .setStyle("Secondary")
                    .setCustomId("isScissor")
                    .setDisabled(),
                ),
              new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setLabel("Noch ein Spiel?")
                    .setStyle("Success")
                    .setCustomId("isRematch-Rps"),
                  new ButtonBuilder()
                    .setLabel("Schließen")
                    .setStyle("Danger")
                    .setCustomId("isClose-Rps")
                )
              ]
            });

          } else if (botChoice == "Papier") {


            Lose++

            interaction.deferUpdate;
            const sent = await interaction.update({
              embeds: [
                new EmbedBuilder()
                  .setTitle('Stein Schere Papier')
                  .setDescription(`\n**Meine Auswahl**\n:raised_hand: Paper\n\n**Vs**\n\n**Deine Entscheidung**\n:fist: Rock\n\n**Ergebnis: Tut mir leid. Du verlierst**`)
                  .setTimestamp()
                  .setColor("#FF84C0")

              ],
              components: [new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setLabel("Stein")
                    .setStyle("Danger")
                    .setCustomId("isRock")
                    .setDisabled(),

                  new ButtonBuilder()
                    .setLabel("Papier")
                    .setStyle("Success")
                    .setCustomId("isPaper")
                    .setDisabled(),

                  new ButtonBuilder()
                    .setLabel("Schere")
                    .setStyle("Secondary")
                    .setCustomId("isScissor")
                    .setDisabled(),
                ),
              new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setLabel("Noch ein Spiel?")
                    .setStyle("Success")
                    .setCustomId("isRematch-Rps"),
                  new ButtonBuilder()
                    .setLabel("Schließen")
                    .setStyle("Danger")
                    .setCustomId("isClose-Rps")
                )
              ]
            });

          } else if (botChoice == "Schere") {


            Wins++

            interaction.deferUpdate;
            const sent = await interaction.update({
              embeds: [
                new EmbedBuilder()
                  .setTitle('Stein Schere Papier')
                  .setDescription(`\n**Meine Auswahl**\n:v: Scissor\n\n**Vs**\n\n**Deine Entscheidung**\n:fist: Stein\n\n**Ergebnis: Herzlichen Glückwunsch! Du hast gewonnen!**`)
                  .setTimestamp()
                  .setColor("#FF84C0")

              ],
              components: [new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setLabel("Stein")
                    .setStyle("Success")
                    .setCustomId("isRock")
                    .setDisabled(),

                  new ButtonBuilder()
                    .setLabel("Papier")
                    .setStyle("Secondary")
                    .setCustomId("isPaper")
                    .setDisabled(),

                  new ButtonBuilder()
                    .setLabel("Schere")
                    .setStyle("Secondary")
                    .setCustomId("isScissor")
                    .setDisabled(),
                ),
              new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setLabel("Noch ein Spiel?")
                    .setStyle("Success")
                    .setCustomId("isRematch-Rps"),
                  new ButtonBuilder()
                    .setLabel("Schließen")
                    .setStyle("Danger")
                    .setCustomId("isClose-Rps")
                )
              ]
            });

          };

        } else if (interaction.customId == "isPaper-Rps") {
          if (botChoice == "Stein") {


            Wins++

            interaction.deferUpdate;
            const sent = await interaction.update({
              embeds: [
                new EmbedBuilder()
                  .setTitle('Stein Schere Papier')
                  .setDescription(`\n**Meine Auswahl**\n:fist: Stein\n\n**Vs**\n\n**Deine Entscheidung**\n:raised_hand: Paper\n\n**Ergebnis: Herzlichen Glückwunsch! Du hast gewonnen!**`)
                  .setTimestamp()
                  .setColor("#FF84C0")

              ],
              components: [new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setLabel("Stein")
                    .setStyle("Secondary")
                    .setCustomId("isRock")
                    .setDisabled(),

                  new ButtonBuilder()
                    .setLabel("Papier")
                    .setStyle("Success")
                    .setCustomId("isPaper")
                    .setDisabled(),

                  new ButtonBuilder()
                    .setLabel("Schere")
                    .setStyle("Secondary")
                    .setCustomId("isScissor")
                    .setDisabled(),
                ),
              new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setLabel("Noch ein Spiel?")
                    .setStyle("Success")
                    .setCustomId("isRematch-Rps"),
                  new ButtonBuilder()
                    .setLabel("Schließen")
                    .setStyle("Danger")
                    .setCustomId("isClose-Rps")
                )
              ]
            });

          } else if (botChoice == "Papier") {


            Draw++

            interaction.deferUpdate;
            const sent = await interaction.update({
              embeds: [
                new EmbedBuilder()
                  .setTitle('Stein Schere Papier')
                  .setDescription(`\n**Meine Auswahl**\n:raised_hand: Paper\n\n**Vs**\n\n**Deine Entscheidung**\n:raised_hand: Paper\n\n**Ergebnis: Gleichstand**`)
                  .setTimestamp()
                  .setColor("#FF84C0")

              ],
              components: [new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setLabel("Stein")
                    .setStyle("Secondary")
                    .setCustomId("isRock")
                    .setDisabled(),

                  new ButtonBuilder()
                    .setLabel("Papier")
                    .setStyle("Primary")
                    .setCustomId("isPaper")
                    .setDisabled(),

                  new ButtonBuilder()
                    .setLabel("Schere")
                    .setStyle("Secondary")
                    .setCustomId("isScissor")
                    .setDisabled(),
                ),
              new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setLabel("Noch ein Spiel?")
                    .setStyle("Success")
                    .setCustomId("isRematch-Rps"),
                  new ButtonBuilder()
                    .setLabel("Schließen")
                    .setStyle("Danger")
                    .setCustomId("isClose-Rps")
                )
              ]
            });

          } else if (botChoice == "Schere") {


            Lose++

            interaction.deferUpdate;
            const sent = await interaction.update({
              embeds: [
                new EmbedBuilder()
                  .setTitle('Stein Schere Papier')
                  .setDescription(`\n**Meine Auswahl**\n:v: Schere\n\n**Vs**\n\n**Deine Entscheidung**\n:raised_hand: Paper\n\n**Ergebnis: Tut mir leid. Du hast verloren**`)
                  .setTimestamp()
                  .setColor("#FF84C0")

              ],
              components: [new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setLabel("Stein")
                    .setStyle("Secondary")
                    .setCustomId("isRock")
                    .setDisabled(),

                  new ButtonBuilder()
                    .setLabel("Papier")
                    .setStyle("Danger")
                    .setCustomId("isPaper")
                    .setDisabled(),

                  new ButtonBuilder()
                    .setLabel("Schere")
                    .setStyle("Success")
                    .setCustomId("isScissor")
                    .setDisabled(),
                ),
              new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setLabel("Noch ein Spiel?")
                    .setStyle("Success")
                    .setCustomId("isRematch-Rps"),
                  new ButtonBuilder()
                    .setLabel("Schließen")
                    .setStyle("Danger")
                    .setCustomId("isClose-Rps")
                )
              ]
            });

          };

        } else if (interaction.customId == "isScissor-Rps") {
          if (botChoice == "Stein") {


            Lose++

            interaction.deferUpdate;
            const sent = await interaction.update({
              embeds: [
                new EmbedBuilder()
                  .setTitle('Stein Schere Papier')
                  .setDescription(`\n**Meine Auswahl**\n:fist: Rock\n\n**Vs**\n\n**Deine Entscheidung**\n:v: Scissor\n\n**Ergebnis: Tut mir leid. Du hast verloren**`)
                  .setTimestamp()
                  .setColor("#FF84C0")

              ],
              components: [new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setLabel("Stein")
                    .setStyle("Success")
                    .setCustomId("isRock")
                    .setDisabled(),

                  new ButtonBuilder()
                    .setLabel("Papier")
                    .setStyle("Secondary")
                    .setCustomId("isPaper")
                    .setDisabled(),

                  new ButtonBuilder()
                    .setLabel("Schere")
                    .setStyle("Danger")
                    .setCustomId("isScissor")
                    .setDisabled(),
                ),
              new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setLabel("Noch ein Spiel?")
                    .setStyle("Success")
                    .setCustomId("isRematch-Rps"),
                  new ButtonBuilder()
                    .setLabel("Schließen")
                    .setStyle("Danger")
                    .setCustomId("isClose-Rps")
                )
              ]
            });

          } else if (botChoice == "Papier") {


            Wins++

            interaction.deferUpdate;
            const sent = await interaction.update({
              embeds: [
                new EmbedBuilder()
                  .setTitle('Stein Schere Papier')
                  .setDescription(`\n**Meine Auswahl**\n:raised_hand: Paper\n\n**Vs**\n\n**Deine Entscheidung**\n:v: Scissor\n\n**Ergebnis: Herzlichen Glückwunsch! Du hast gewonnen!**`)
                  .setTimestamp()
                  .setColor("#FF84C0")

              ],
              components: [new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setLabel("Stein")
                    .setStyle("Secondary")
                    .setCustomId("isRock")
                    .setDisabled(),

                  new ButtonBuilder()
                    .setLabel("Papier")
                    .setStyle("Secondary")
                    .setCustomId("isPaper")
                    .setDisabled(),

                  new ButtonBuilder()
                    .setLabel("Schere")
                    .setStyle("Success")
                    .setCustomId("isScissor")
                    .setDisabled(),
                ),
              new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setLabel("Noch ein Spiel?")
                    .setStyle("Success")
                    .setCustomId("isRematch-Rps"),
                  new ButtonBuilder()
                    .setLabel("Schließen")
                    .setStyle("Danger")
                    .setCustomId("isClose-Rps")
                )
              ]
            });

          } else if (botChoice == "Schere") {


            Draw++

            interaction.deferUpdate;
            const sent = await interaction.update({
              embeds: [
                new EmbedBuilder()
                  .setTitle('Stein Schere Papier')
                  .setDescription(`\n**Meine Auswahl**\n:v: Scissor\n\n**Vs**\n\n**Deine Entscheidung**\n:v: Scissor\n\n**Ergebnis: Gleichstand**`)
                  .setTimestamp()
                  .setColor("#FF84C0")

              ],
              components: [new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setLabel("Stein")
                    .setStyle("Secondary")
                    .setCustomId("isRock")
                    .setDisabled(),

                  new ButtonBuilder()
                    .setLabel("Papier")
                    .setStyle("Secondary")
                    .setCustomId("isPaper")
                    .setDisabled(),

                  new ButtonBuilder()
                    .setLabel("Schere")
                    .setStyle("Primary")
                    .setCustomId("isScissor")
                    .setDisabled(),
                ),
              new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setLabel("Noch ein Spiel?")
                    .setStyle("Success")
                    .setCustomId("isRematch-Rps"),
                  new ButtonBuilder()
                    .setLabel("Schließen")
                    .setStyle("Danger")
                    .setCustomId("isClose-Rps")
                )
              ]
            });

          };
        };

        if (interaction.customId == "isRematch-Rps" && interaction.user.id == member.id) {

          const choice = ["Stein",
            "Papier",
            "Schere"];

          const botChoice = choice[Math.floor(Math.random() * choice.length)];

          await interaction.deferUpdate;
          const sent = await interaction.update({
            embeds: [
              new EmbedBuilder()
                .setTitle('Stein Schere Papier')
                .setDescription(`Revanche!!!\nVerwenden Sie die Schaltfläche unten, um zu wählen!\n\n**Aktuelle Statistik**\nGewonnen: ${Wins}\nGleichstand: ${Draw}\nVerloren: ${Lose}`)
                .setTimestamp()
                .setColor("#FF84C0")
            ],
            components: [Button]
          });

        };

        if (interaction.customId == "isClose-Rps" && interaction.user.id == member.id) {

          interaction.deferUpdate;
          interaction.update({
            embeds: [
              new EmbedBuilder()
                .setTitle('Stein Schere Papier')
                .setDescription(`Danke, dass du mitgespielt hast. Ich hoffe, wir können beim nächsten Mal wieder zusammen spielen!\n\n**Endgültiges Ergebnis**\nGewonnen: ${Wins}\nGleichstand: ${Draw}\nVerloren: ${Lose}`)
                .setFooter({
                  text: "Diese Nachricht wird in 1 Minute automatisch gelöscht"
                })
                .setColor("#FF84C0")
            ],
            components: []
          });

          setTimeout(() => interaction.message.delete(), 1000 * 60);

        }

      });

    setTimeout(() => {
      if (interaction.message) interaction.message.delete()
    },
      1000 * 60 * 10);

  }
}