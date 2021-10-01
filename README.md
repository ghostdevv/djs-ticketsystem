
> **NOTE** djs-ticketsystem v3 is in beta

# DJS-TicketSystem
[![](https://img.shields.io/npm/v/djs-ticketsystem?label=Latest%20Version&style=for-the-badge&logo=npm&color=informational)](https://www.npmjs.com/package/dashargs)
[![](https://img.shields.io/static/v1?label=Author&message=GHOST&color=informational&style=for-the-badge)](https://ghostdev.xyz)

DJS-TicketSystem is a package designed to make creating "tickets" in discord servers easier

# Install
```
npm install djs-ticketsystem
```

# Get Started
Here is an example on how to setup your bot with the ticket system.<br />
You can also use require, for example `const { TicketSystem } = require('djs-ticketsystem');`

```js
import { TicketSystem } from 'djs-ticketsystem';
import { Intents, Client } from 'discord.js';

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const tickets = new TicketSystem(client, {});

client.login();
```

# Creating a ticket
Below is an example of how you can create a ticket, you always have to pass in `owner` and `guild` but you can also pass in any option for [GuildChannelCreateOptions](https://discord.js.org/#/docs/main/stable/typedef/GuildChannelCreateOptions)

```js
client.on('messageCreate', async (message) => {
    if (message.content == '-new') {
        const ticket = await tickets.create({
            owner: message.member,
            guild: message.guild
        })
    }
});
```

# Methods on TicketChannel
Once a ticket channel is created you can do some methods on it:

- `<ticket>.owner` This returns a [GuildMember](https://discord.js.org/#/docs/main/stable/class/GuildMember) who is the ticket owner

# Methods on tickets
There also some methods and properties on `tickets`

- `<tickets>.isTicket(channel: TicketChannelResolvable)` This allows you to check if a channel is a ticket or not by passing in a [TicketChannelResolvable](https://ghostdevv.github.io/djs-ticketsystem/modules.html#TicketChannelResolvable)

- `<tickets>.tickets` This is a cached manager like you are used to with [GuildChannelManager](https://discord.js.org/#/docs/main/stable/class/GuildChannelManager) for example, you can view more info [here]()

# Support
-   Join the [discord](https://discord.gg/2Vd4wAjJnm)<br>
-   Create a issue on the [github](https://github.com/ghostdevv/djs-ticketsystem)
