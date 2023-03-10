import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
   console.log('The bot is ready')

    const guildId = '829324431981674496'
    const guild = client.guilds.cache.get(guildId)
    let commands

    if (guild) {
        commands = guild.commands
    }   else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'ping',
        description: 'Replies with pong.',
    })

    commands?.create({
        name: 'add',
        description: 'Add two numbers.',
        options: [
         {
            name: 'num1',
            description: 'The first number.',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
         },
         {
          name: 'num2',
          description: 'The second number.',
          required: true,
          type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
         }
         
        ]
    })
})
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) 
    return;

    const { commandName, options } = interaction

	if (commandName === 'ping') {
		await interaction.reply({
         content: 'Pong!',
          ephemeral: true,
         });
	} 
    else if (commandName === 'add') {
        const num1 = options.getNumber('num1')!
        const num2 = options.getNumber('num2')!

        await interaction.reply({
            content: `The sum is ${num1 + num2}`,
            ephemeral: true,
         });
    }
});

client.login(process.env.TOKEN);