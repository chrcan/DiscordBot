require("dotenv").config()
const fs = require("fs")

const { Client, Collection, GatewayIntentBits, Partials, ActivityType, InteractionType, Events, EmbedBuilder } = require("discord.js")
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Channel]

});

client.commands = new Collection()

const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"))
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"))

commandFiles.forEach(commandFile => {
  const command = require(`./commands/${commandFile}`)
  client.commands.set(command.data.name, command)
})

eventFiles.forEach(eventFile => {
  const event = require(`./events/${eventFile}`)
  client.on(event.name, (...args) => event.execute(...args))
})

//Der Client ist eingeloggt
client.once("ready", () => {
  console.log(`Bereit! Eingeloggt als ${client.user.tag}! Ich bin bei ${client.guilds.cache.size}`)
  client.user.setActivity({ name: "dir zu", type: ActivityType.Watching })
})

client.on("interactionCreate", async (interaction) => {
  if (interaction.type !== InteractionType.ApplicationCommand) return

  const command = client.commands.get(interaction.commandName)
  if (command) {
    try {
      await command.execute(interaction)
    } catch (error) {
      console.error(error)

      if (interaction.deferred || interaction.replied) {
        interaction.editReply("Es ist ein Fehler beim ausführen aufgetreten!")
      } else {
        interaction.reply("Es ist ein Fehler beim ausführen aufgetreten!")
      }
    }
  }
})

// Modal eingegebene Nachricht senden auf die console
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isModalSubmit()) return;
  if (interaction.customId === 'modal') {
    await interaction.reply({ content: "Dein Modal wurde abgesendet", ephemeral: true })
  }

  // Zeigt die Modal-Eingabe in discord an
  const name = interaction.fields.getTextInputValue("name");
  const about = interaction.fields.getTextInputValue("about");
  const author = interaction.fields.getTextInputValue("author");

  const embed = new EmbedBuilder()
    .setColor("#ffcc3f")
    .setTitle("Deine Eingabe im Modal")
    .setThumbnail('https://i.imgur.com/FjincTg.png')
    .addFields(
      { name: 'Author:', value: `${author}`, inline: true },
      { name: 'Name:', value: `${name}`, inline: true },
      { name: 'Sag uns was über deine Person:', value: `${about}` },
    )
  await interaction.channel.send({ embeds: [embed] })

  // console.log(`Author: ${author} \n \nName: ${name} \n \nSag uns was über deine Person: ${about}`)

  // const content = `Author: ${author} \nName: ${name} \nÜber deine Person: ${about}`;
  // await interaction.channel.send(content);
})
// Client Login
client.login(process.env.DISCORD_BOT_TOKEN);