import { TicketSystemOptions, schema as tSchema } from './TicketSystem';
import type { Guild, GuildMember } from 'discord.js';
import Joi from 'joi';

export interface CreateOptions extends TicketSystemOptions {
    owner: string | GuildMember;
    guild: string | Guild;
}

export const schema = tSchema.append<CreateOptions>({
    owner: [Joi.string(), Joi.object()],
    guild: [Joi.string(), Joi.object()],
});
