const Discord = require('discord.js');

const client = new Discord.Client();
//server
const server = client.guilds.get("196070842029834251");
//vc
var channel = client.channels.get("642963122860326914"); 
var searching = 'false';
var onOff = 'on'

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity('kotori best waifu');
});

client.on('message', msg => {
	//vc
	let channel = client.channels.get("642963122860326914"); 
  if (msg.content === ',join') {
		msg.delete();
		channel.join();
  }
  if (msg.content === ',leave') {
		msg.delete();
    channel.leave();
  }
	if (msg.content === ',on') {
		msg.delete();
		onOff = 'on'
		const embed = {
			"title": "Bot will now search for a loser",
			"color": 6593371
		};
		msg.channel.send({embed}).then(msg => {msg.delete(5000)});
		client.user.setActivity('for a loser', { type: 'WATCHING' });
	}
	if (msg.content === ',status') {
		msg.delete();
    msg.channel.send(onOff);
  }
	if (msg.content === ',off') {
		msg.delete();
		onOff = 'off'
		const embed = {
			"title": "Bot will no longer search for a loser",
			"color": 6593371
		};
		msg.channel.send({embed}).then(msg => {msg.delete(5000)});
		client.user.setActivity('kotori best waifu');
	}
	if (msg.content === ',test') {
		msg.delete();
		/*
		var i;
		var hasBot = false;
		for ([snowflake, guildMember] of channel.members) {
			console.log("is " + snowflake + " a bot? " + guildMember.user.bot);
			if (guildMember.user.bot == true) {
				hasBot = true;
				break;
			}
		}
		console.log(hasBot);
		*/
		//console.log(containsBot());
		msg.channel.send("aight this nigga is a bot: " + nigger());
	}
});

function containsBot() {
	let channel = client.channels.get("642963122860326914"); 
	var i;
	var hasBot = false;
	for ([snowflake, guildMember] of channel.members) {
		console.log("is " + snowflake + " a bot? " + guildMember.user.bot);
		if (guildMember.user.bot == true) {
			hasBot = true;
			break;
		}
	}
	return hasBot;
}

//checks if that man is a bot or not
function nigger() {
	let channel = client.channels.get("642963122860326914"); 
	var i;
	for ([snowflake, guildMember] of channel.members) {
		if (guildMember.user.bot == false) {
			return guildMember;
		}
	}
}


client.on('voiceStateUpdate', (oldMember, newMember) => {
	//vc
	let channel = client.channels.get("642963122860326914"); 
	//tc
	let txtChannel = client.channels.get('196070842029834251');
	//if someone loses
	if (channel.members.size === 1 && searching === 'true' && onOff === 'on') {
		const embed = {
			"title": "Uh oh! " + channel.members.first().nickname + " lost. How sad...",
			"color": 6593371
		};
		txtChannel.send('<@' + channel.members.first().id + '>',{embed});
		searching = 'false';
		client.user.setActivity('kotori best waifu');
		//IF THE LAST GUY IS A BOT
	} else if (channel.members.size === 2 && searching === 'true' && onOff === 'on' && containsBot() == true) {
		var nigga = nigger();
		const embed = {
			"title": "Uh oh! " + nigga.nickname + " lost. How sad...",
			"color": 6593371
		};
		txtChannel.send('<@' + nigga.id + '>',{embed});
		searching = 'false';
		client.user.setActivity('kotori best waifu');
	}
	//init bot
	if (channel.members.size > 2 && searching == 'false' && onOff === 'on') {
		searching = 'true';
		const embed = {
			"title": "3 people in call, starting search",
			"color": 6593371
		};
		txtChannel.send({embed}).then(msg => {msg.delete(5000)});
	}
});

client.login('NTk1MTAxMTA0MDQ4NTcwMzY5.XRmFQA.O4nm0CmBDPFCJIP08a5B4fcbZyk');