const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('simple-calc')
    .setDescription('Just a Simple calculators commands')
    .addStringOption((opt) => opt
      .setName('method')
      .setDescription('Math method')
      .addChoices(
        {
          name: "(+) Assignment",
          value: "assign"
        },
        {
          name: "(-) Subtraction",
          value: "subtract"
        },
        {
          name: "(x) Multiply",
          value: "multiply"
        },
        {
          name: "(/) Divide",
          value: "divide"
        },
      )
      .setRequired(true)
    )
    .addNumberOption((opt) => opt
      .setName('value1')
      .setDescription('First value')
      .setRequired(true)
    )
    .addNumberOption((opt) => opt
      .setName('value2')
      .setDescription('Second value')
      .setRequired(true)
    ),
  /**
  * @param {ChatInputCommandInteraction} interaction
  *
  */
  execute(interaction) {
    const {
      options,
      member
    } = interaction;

    const method = options.getString("method");
    const num1 = options.getNumber("value1");
    const num2 = options.getNumber("value2");

    function deleteTimer(msg) {
      setTimeout(() => interaction.deleteReply(msg), 1000 * 60 * 10);
    }

    switch (method) {
      case 'assign':

        const assignEmbed = new EmbedBuilder()
          .setTitle("Simple Calc")
          .addFields(
            {
              name: "Math",
              value: `${num1} + ${num2}`
            },
            {
              name: "Results",
              value: `${num1 + num2}`
            }
          )
          .setColor("#FF84C0")
          .setFooter({
            text: `Requested by ${member.displayName} | Message auto delete in 10 minutes`,
            iconURL: member.displayAvatarURL({
              dynamic: true,
              size: 1024
            })
          });

        interaction.reply({
          embeds: [assignEmbed]
        }).then(msg => deleteTimer(msg));

        break;
      case 'subtract':

        const subtractEmbed = new EmbedBuilder()
          .setTitle("Simple Calc")
          .addFields(
            {
              name: "Math",
              value: `${num1} - ${num2}`
            },
            {
              name: "Results",
              value: `${num1 - num2}`
            }
          )
          .setColor("#FF84C0")
          .setFooter({
            text: `Requested by ${member.displayName} | Message auto delete in 10 minutes`,
            iconURL: member.displayAvatarURL({
              dynamic: true,
              size: 1024
            })
          });

        interaction.reply({
          embeds: [subtractEmbed]
        }).then(msg => deleteTimer(msg));

        break;
      case 'multiply':

        const multiplyEmbed = new EmbedBuilder()
          .setTitle("Simple Calc")
          .addFields(
            {
              name: "Math",
              value: `${num1} x ${num2}`
            },
            {
              name: "Results",
              value: `${num1 * num2}`
            }
          )
          .setColor("#FF84C0")
          .setFooter({
            text: `Requested by ${member.displayName} | Message auto delete in 10 minutes`,
            iconURL: member.displayAvatarURL({
              dynamic: true,
              size: 1024
            })
          })

        interaction.reply({
          embeds: [multiplyEmbed]
        }).then(msg => deleteTimer(msg));

        break;
      case 'divide':

        const divideEmbed = new EmbedBuilder()
          .setTitle("Simple Calc")
          .addFields(
            {
              name: "Math",
              value: `${num1} / ${num2}`
            },
            {
              name: "Results",
              value: `${num1 / num2}`
            }
          )
          .setColor("#FF84C0")
          .setFooter({
            text: `Requested by ${member.displayName} | Message auto delete in 10 minutes`,
            iconURL: member.displayAvatarURL({
              dynamic: true,
              size: 1024
            })
          })

        interaction.reply({
          embeds: [divideEmbed]
        }).then(msg => deleteTimer(msg));

        break;
    }
  }
}