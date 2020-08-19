

# DJS-TicketSystem
[![](https://img.shields.io/npm/v/djs-ticketsystem?label=Latest%20Version&style=for-the-badge&logo=npm&color=informational)](https://www.npmjs.com/package/dashargs)
[![](https://img.shields.io/static/v1?label=Author&message=GHOST&color=informational&style=for-the-badge)](https://ghostdev.xyz)

DJS-TicketSystem is a package designed to make creating "tickets" in discord servers easier

## Install
```
npm install --save djs-ticketsystem
```

## Setup
To setup djs-ticketsystem add this code at the top of your index file
```js
const ticketSystem = require('djs-ticketsystem');
```
For example:
```js
const ticketSystem = require('djs-ticketsystem');
const { Client } = require('discord.js');

const client = new Client();

client.on('ready', () => console.log('Online!'));

client.on('message', message => {
    if (message.content == '-ticket') {
        message.guild.createTicket({ owner: message.author })
            .catch(console.error);
    };
});

client.login('token');
```

## Create a ticket
`<guild>.createTicket({ options });`<br>
Where `<guild>` is the guild class (see below if you are unsure)
#### Options
`name` This is the name of the ticket. You can use custom variables here (see below)<br>
`owner` **REQUIRED** This is the owner of the ticket. It must be a user.<br>
`category` This is the category the the ticket it is. It can be either a id, name, or category object.<br>
`type` This is the type of ticket it is. The default is text.<br>
`nsfw` Boolean to show whether the ticket is nsfw or not.<br>
`bitrate` The bitrate. Voice tickets only.<br>
`userLimit` The user limit. Voice tickets only.<br>
`permissionOverwrites` The permission data for the ticket.<br>
`position` The position of the ticket.<br>
`rateLimitPerUser` The slowmode setting of the ticket.<br>
`reason` The reason for opening the ticket.<br>
`openMessage.text` If you want to send a message in the ticket when it opens.<br>
`openMessage.embed` If you want to send an embed in the ticket when it opens.

The default config is
```js
{
    name: 'ticket-{OWNER.USERNAME}',
    type: 'text',
    nsfw: false,
    permissionOverwrites: [
        {
            id: '{OWNER.ID}',
            allow: ['CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER', 'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'VIEW_GUILD_INSIGHTS', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS' ]
        },
        {
            id: '{GUILD.ID}',
            deny: ['CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER', 'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'VIEW_GUILD_INSIGHTS', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS' ]
            }
    ],
    openMessage: {
        embed: new MessageEmbed().setColor('RANDOM').setDescription('Welcome to your ticket {OWNER}')
    },
}
```

#### Custom variables
There are custom variables built in that allow for easily including data in messages. You are able to use them on permissionOverwrites id as seen above, and in the openingMessage embed and/or text.<br>
`{OWNER}` Used if you want to mention the owner<br>
`{OWNER.USERNAME}` Used if you want to display the owner's username<br>
`{OWNER.TAG}` Used if you want to display the owner's tag<br>
`{OWNER.DISCRIMINATOR}` Used if you want to display the owner's discriminator<br>
`{OWNER.ID}` Used if you want to display the owner's id<br>
`{GUILD}` Used if you want to display the guild<br>
`{GUILD.ID}` Used if you want to display the guild's id<br>
`{GUILD.NAME}` Used if you want to display the guild's name<br>

#### Examples of where to create a ticket
```js
client.on('message', message => {
    if (message.content == '-ticket') {
        message.guild.createTicket({ owner: message.author })
            .catch(console.error);
    };
});
```

## Other Methods
`<channel>.isTicket()`<br>
For Example
```js
client.on('message', message => {
    if (message.content == 'close' && message.channel.isTicket()) {
        console.log('Closed a ticket channel!');
        message.channel.delete();
    }
});
```
`ticketSystem.defaults({ options })`<br>
You are able to edit the default options using this method<br>
For Example
```js
const ticketSystem = require('djs-ticketsystem');

ticketSystem.defaults({
    name: 'ticket-{OWNER.USERNAME}-{OWNER.DISCRIMINATOR}'
});
```

## Support

You can message me on discord: `GHOST#7524` or create a issue on the [github](https://github.com/ghostdevv/djs-ticketsystem)
