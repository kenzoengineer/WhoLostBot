const Discord = require('discord.js');
 
fs = require('fs');
 
const client = new Discord.Client();

const vc = "595102402168750085";
const tc = "595102402168750083";

//server
const server = client.guilds.get("595102402168750081");
//vc
var channel = client.channels.get(vc); 
var searching = 'false';
var onOff = 'on'



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('kotori best waifu');
});
 
client.on('message', msg => {
    //vc
    let channel = client.channels.get(vc); 
    //tc
    let txtChannel = client.channels.get(tc);
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
        client.user.setActivity('kotori best waifu');
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
    }
    
    if (msg.content === ',list') {
        msg.delete();
        var fileString = fs.readFileSync('loser.txt','utf8');
        var unsorted = "";
        for ([snowflake, guildMember] of txtChannel.members) {
            var idName = guildMember.user.id;
            var userN = guildMember.user.username;
            //console.log(idName);
            var re = new RegExp (idName, "g");
            //msg.channel.send(userN + " count is " + (fileString.match(re)||[]).length);
            unsorted += (fileString.match(re)||[]).length + "-" + userN + "`";
        }
        var arr = unsorted.split("`");
        arr.sort().reverse().pop();
        console.log(arr);
        var output = "";
        var x;
        for (x in arr) {
            console.log(arr[x]);
            if (arr[x].substring(0,arr[x].indexOf("-")) !== "0") output += "__**" + arr[x].substring((arr[x].indexOf("-") + 1)) + "**__:    " + arr[x].substring(0,arr[x].indexOf("-")) + "\n";
        }
        const embed = {
            "title": "╔═════ ∘◦ ☆ ◦∘ ═════╗\n" + "\t\t\t\tLoser Counts" + "\n╚═════ ∘◦ ☆ ◦∘ ═════╝",
            "description": output,
            "color": 16711904
        };
        msg.channel.send("Here are the current standings: ");
        msg.channel.send({embed});
    }
});
 
function containsBot() {
    let channel = client.channels.get("642963122860326914"); 
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
    let channel = client.channels.get("642963122860326914"); 
    for ([snowflake, guildMember] of channel.members) {
        if (guildMember.user.bot == false) {
            return guildMember;
        }
    }
}
 
function writeF(a) {
    fs.appendFile('loser.txt', a + '\n', function (err) {
  if (err) throw err;
  console.log('Saved!');})
}
 
client.on('voiceStateUpdate', (oldMember, newMember) => {
    //vc
    let channel = client.channels.get(vc); 
    //tc
    let txtChannel = client.channels.get(tc);
    //if someone loses
    if (channel.members.size === 1 && searching === 'true' && onOff === 'on') {
        const embed = {
            "title": "Uh oh! " + channel.members.first().user.username + " lost. How sad...",
            "color": 6593371
        };
        writeF(channel.members.first().id);
        txtChannel.send('<@' + channel.members.first().id + '>',{embed});
        searching = 'false';
        client.user.setActivity('kotori best waifu');
        //IF THE LAST GUY IS A BOT
    } else if (channel.members.size === 2 && searching === 'true' && onOff === 'on' && containsBot() == true) {
        var possibleLoser = isBot();
        const embed = {
            "title": "Uh oh! " + possibleLoser.user.username + " lost. How sad...",
            "color": 6593371
        };
        writeF(channel.members.first().id);
        txtChannel.send('<@' + possibleLoser.id + '>',{embed});
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
        client.user.setActivity('for a loser', { type: 'WATCHING' });
    }
});
 
client.login('NTk1MTAxMTA0MDQ4NTcwMzY5.XRmFQA.O4nm0CmBDPFCJIP08a5B4fcbZyk');