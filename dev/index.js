import { config } from 'dotenv';
config({ path: 'dev/.env' });

import { TicketSystem } from 'djs-ticketsystem';
import { Intents, Client } from 'discord.js';

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const tickets = new TicketSystem(client);

tickets.create('663140687591768074');

client.on('ready', () => console.log('Online'));

client.login();
