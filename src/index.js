require("dotenv").config()
const fs = require("fs")

const { Client, Collection, GatewayIntentBits, Partials, ActivityType, InteractionType } = require("discord.js")
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

client.once("ready", () => {
  console.log(`Bereit! Eingeloggt als ${client.user.tag}! Ich bin bei ${client.guilds.cache.size}`)
  client.user.setActivity({ name: "mit dem Code", type: ActivityType.Playing })
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
// Client Login
client.login(process.env.DISCORD_BOT_TOKEN);