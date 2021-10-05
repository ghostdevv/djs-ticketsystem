import type { GuildChannelCreateOptions } from 'discord.js';
import Joi from 'joi';

export interface TicketSystemOptions extends GuildChannelCreateOptions {
    name: string;
}

export const schema = Joi.object<TicketSystemOptions>({
    name: Joi.string().min(1).max(32).default('{owner.user.username}-{id}'),
}).unknown();
