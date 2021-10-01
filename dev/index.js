import { config } from 'dotenv';
config({ path: 'dev/.env' });

import { TicketSystem } from 'djs-ticketsystem';
import { Intents, Client } from 'discord.js';

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const tickets = new TicketSystem(client);

client.on('ready', () => console.log('Online'));

const ticket = await tickets.create({
    guild: '663140687591768074',
    owner: '282839711834177537',
});

client.login();
