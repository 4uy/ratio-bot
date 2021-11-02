const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");

const client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]});

//#region Functions
function MakeString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
//#endregion

//#region Ratio
client.on("messageCreate", async message => {
	const SUCCESS_SENT_WEBHOOK = {
		content: `https://files.auy.sh/ratio.gif ||<@${message.author.id}>|| :rofl::rofl::rofl:`,
		username: MakeString(16),
		avatarURL: 'https://files.auy.sh/ratio.gif',
		embeds: [],
	}

	const ERROR_NO_WEBHOOK = {
		content: "Created new webhook.",
		username: MakeString(16),
		avatarURL: 'https://files.auy.sh/ratio.gif',
		embeds: [],
	}

	if (config.to_ratio.includes(message.author.id) || message.content == "ratio me") {
		const channel = client.channels.cache.get(message.channelId);
		try {
			const webhooks = await channel.fetchWebhooks();
			const webhook = webhooks.first();
	
			await webhook.send(SUCCESS_SENT_WEBHOOK);
	
		} catch (error) {
			channel.createWebhook(MakeString(16))
				.then(webhook => webhook.send(ERROR_NO_WEBHOOK))
				.catch(console.error);
		}
	}	
});
//#endregion

client.login(config.token);