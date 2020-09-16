const Discord = require("discord.js");

fs = require("fs");

const client = new Discord.Client();

const vc = "642963122860326914";
const tc = "196070842029834251";

//server
const server = client.guilds.get("196070842029834251");
//vc
//var channel = client.channels.get(vc);
var searching = "false";
var onOff = "on";



client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity("kotori best waifu");
});

client.on("message", (msg) => {
	//vc
	var channel = client.channels.get(vc);
	//tc
	var txtChannel = client.channels.get(tc);
	if (msg.content === ",join") {
		msg.delete();
		channel.join();
	}
	if (msg.content === ",leave") {
		msg.delete();
		channel.leave();
	}
	if (msg.content === ",on") {
		msg.delete();
		onOff = "on";
		const embed = {
			"title": "Bot will now search for a loser",
			"color": 6593371
		};
		msg.channel.send({
			embed
		}).then(msg => {
			msg.delete(5000)
		});
		client.user.setActivity("kotori best waifu");
	}
	if (msg.content === ",status") {
		msg.delete();
		msg.channel.send(onOff);
	}
	if (msg.content === ",off") {
		msg.delete();
		onOff = "off"
		const embed = {
			"title": "Bot will no longer search for a loser",
			"color": 6593371
		};
		msg.channel.send({
			embed
		}).then(msg => {
			msg.delete(5000)
		});
	}

	if (msg.content === ",list") {
		msg.delete();
		var fileString = fs.readFileSync("loser.txt", "utf8");
		var unsorted = "";
		for ([snowflake, guildMember] of txtChannel.members) {
			var count = ((fileString.match(new RegExp(guildMember.user.id, "g")) || []).length).toString();
			//add leading 10x leading zeros
			var cLength = count.length
			for (i = 0; i < (10 - cLength); i++) {
				count = "." + count;
			}
			unsorted += count + "-" + guildMember.user.username + "`";
		}
		var arr = unsorted.split("`");
		arr.sort().reverse().pop();
		console.log(arr);
		var output = "";
		var x;
		for (x in arr) {
			var item = arr[x];
			console.log(item.substring(item.lastIndexOf(".") + 1,item.length));

			if (item.substring(0, item.indexOf("-")) !== "0") {
				output += "__**" + item.substring((item.indexOf("-") + 1)) + "**__:    " + item.substring(item.lastIndexOf(".") + 1, item.indexOf("-")) + "\n";
			}
		}
		const embed = {
			"title": "╔═════ ∘◦ ☆ ◦∘ ═════╗\n" + "\t\t\t\tLoser Counts" + "\n╚═════ ∘◦ ☆ ◦∘ ═════╝",
			"description": output,
			"color": 16711904
		};
		msg.channel.send("Here are the current standings: ");
		msg.channel.send({
			embed
		});
	}
});

function containsBot() {
	var channel = client.channels.get(vc);
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

//checks if that user is a bot or not
function isBot() {
	var channel = client.channels.get(vc);
	for ([snowflake, guildMember] of channel.members) {
		if (guildMember.user.bot == false) {
			return guildMember;
		}
	}
}

function writeF(a) {
	fs.appendFile("loser.txt", a + "\n", function(err) {
		if (err) throw err;
		console.log("Saved!");
	})
}

client.on("voiceStateUpdate", (oldMember, newMember) => {
	//vc
	var channel = client.channels.get(vc);
	//tc
	var txtChannel = client.channels.get(tc);
	//if someone loses
	if (channel.members.size === 1 && searching === "true" && onOff === "on") {
		const embed = {
			"title": "Uh oh! " + channel.members.first().user.username + " lost. How sad...",
			"color": 6593371
		};
		writeF(channel.members.first().id);
		txtChannel.send("<@" + channel.members.first().id + ">", {
			embed
		});
		searching = "false";
		client.user.setActivity("kotori best waifu");
		//IF THE LAST GUY IS A BOT
	} else if (channel.members.size === 2 && searching === "true" && onOff === "on" && containsBot() == true) {
		console.log("members are now two");
		var possibleLoser = isBot();
		const embed = {
			"title": "Uh oh! " + possibleLoser.user.username + " lost. How sad...",
			"color": 6593371
		};
		writeF(channel.members.first().id);
		txtChannel.send("<@" + possibleLoser.id + ">", {
			embed
		});
		searching = "false";
		client.user.setActivity("kotori best waifu");
	}
	//init bot
	if (channel.members.size > 2 && searching == "false" && onOff === "on") {
		searching = "true";
		const embed = {
			"title": "3 people in call, starting search",
			"color": 6593371
		};
		txtChannel.send({
			embed
		}).then(msg => {
			msg.delete(5000)
		});
		client.user.setActivity("for a loser", {
			type: "WATCHING"
		});
	}
});

const config = require("./auth.json");
client.login(config.token);