# WhoLostBot
Discord bot to see who lost.

# Backstory
You don't want to be the first one to leave the voice call. Neither does anyone else. Now you are at an impasse; Nobody will leave the voice call at all. How do you solve this? Invent a game where the last person in the voice call loses. What do they lose? Nothing, just the game.

Everyone eventually caught on, however, as the microsecond a person leaves the voice call at the end of a long, fruitful gaming session the rest follow. Even mentioning leaving prompted premature departures from the channel. This made seeing "who lost" impossible to tell. We needed a tool, a "photo finish" style tracking utility to find out who **truely** lost.

# The Bot
I used this as an opportunity to create something. An opportunity to learn javascript, use node.js and have a little fun. This will only work on one server at a time and the github files do not include `auth.json` which has the login token for the bot so it will not work on other systems. I currently have this bot hosted on one of Amazon's EC2 (Elastic Compute Cloud) servers for 24/7 runtime for *free* (yay).

Not only does it keep track of who the last to leave was, it also disregards *other* discord bots. This means that if there are two members of a voice channel, a music bot and a human, the human will still lose despite there still being "someone" else in the channel.

When someone inevitably loses, it broadcasts the loser to the whole server

![uh oh u lost](https://i.imgur.com/yVNI9xy.jpg)

And later, if you want to view the statistics of the most losery losers you can do so with a simple command `,list`

![RIP jobo](https://i.imgur.com/nlI8D4e.jpg)
