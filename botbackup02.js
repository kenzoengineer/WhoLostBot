const Discord = require('discord.js');
 
fs = require('fs');
 
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
    //tc
    let txtChannel = client.channels.get('196070842029834251');
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
        //msg.delete();
        onOff = 'off'
        const embed = {
            "title": "Lol did u just try turning off the bot? ",
            "color": 6593371
        };
        msg.channel.send('<@' + msg.author.id + '>',{embed});
    }
    
    if (msg.content === ',TTT') {
        var peopleList = [];
        var nameList = [];
        msg.delete();
        for ([snowflake, guildMember] of msg.channel.members) {
            if (guildMember.roles.find(r => r.name === "TTT")) {
                console.log(guildMember.user.username + " has the TTT role");
                peopleList.push(snowflake);
                nameList.push(guildMember.user.username);
            }
        }
        console.log();
        console.log(peopleList);
        console.log();
        
        var randomNumber = Math.floor(Math.random() * (peopleList.length));
        murderer = peopleList[randomNumber];
        murderName = nameList[randomNumber];
        console.log(murderName + " is the murderer");
        peopleList.splice(randomNumber, 1);
        nameList.splice(randomNumber, 1);
    
        randomNumber = Math.floor(Math.random() * (peopleList.length));
        murderer2 = peopleList[randomNumber];
        murder2Name = nameList[randomNumber];
        console.log(murder2Name + " is the murderer");
        peopleList.splice(randomNumber, 1);
        nameList.splice(randomNumber, 1);
 
        console.log();
        console.log(peopleList);
        console.log();
        
        randomNumber = Math.floor(Math.random() * (peopleList.length));
        detective = peopleList[randomNumber];
        console.log(detective + " is the detective");
        
        //client.users.get(murderer).send("you are the murderer");
        client.users.get(murderer).send("you are the murderer and so is " + murder2Name);
        client.users.get(murderer2).send("you are the murderer and so is " + murderName);
        msg.channel.send("The detective is " + '<@' + detective + '>');
        //client.users.get(detective).send("you are the detective");
        //msg.channel.send("The murderer has been selected");
        //console.log(msg.channel.members.first());
    }
    if (msg.content === ',x372391j2ns') {
        msg.delete();
        msg.channel.send("nigga");
    }
    
    if (msg.content === ',work') {
        msg.delete();
        console.log(client.fetchUser("196069761082327041"));
        msg.channel.send(client.fetchUser("196069761082327041"));
    }
    
    if (msg.content === ',addRole') {
        msg.delete();
        msg.member.addRole("690342686049567164");
    }
    
    if (msg.content == ',reset'){ 
        for ([snowflake, guildMember] of msg.channel.members) {
            if (guildMember.roles.find(r => r.name === "TTT")) {
                guildMember.removeRole("690342686049567164");
            }
        }
        msg.channel.send("All TTT roles removed");
    }
    /*
    if (msg.content.startsWith(',add')) {
        var text = msg.content.substring(msg.content.indexOf(' ') + 1);
        msg.delete();
        writeF(text);
    }
    */
    
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
 
//checks if that man is a bot or not
function nigger() {
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
    let channel = client.channels.get("642963122860326914"); 
    //tc
    let txtChannel = client.channels.get('196070842029834251');
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
        var nigga = nigger();
        const embed = {
            "title": "Uh oh! " + nigga.user.username + " lost. How sad...",
            "color": 6593371
        };
        writeF(channel.members.first().id);
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
        client.user.setActivity('for a loser', { type: 'WATCHING' });
    }
});
 
client.login('NTk1MTAxMTA0MDQ4NTcwMzY5.XRmFQA.O4nm0CmBDPFCJIP08a5B4fcbZyk');