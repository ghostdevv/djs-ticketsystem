import type { Guild, GuildMember, OverwriteResolvable } from 'discord.js';
import type { TicketSystemOptions } from './TicketSystem';
import { Permissions } from 'discord.js';
import { schema as tSchema } from './TicketSystem';
import Joi from 'joi';

export interface CreateOptions extends TicketSystemOptions {
    owner: string | GuildMember;
    guild: string | Guild;
}

export const schema = tSchema.append<CreateOptions>({
    owner: [Joi.string(), Joi.object()],
    guild: [Joi.string(), Joi.object()],
});

export const defaultPermissions = (): OverwriteResolvable[] => [
    {
        id: '{guild.id}',
        deny: [Permissions.ALL],
    },
    {
        id: '{owner.id}',
        allow: [
            // General
            Permissions.FLAGS.VIEW_CHANNEL,

            // Text
            Permissions.FLAGS.SEND_MESSAGES,
            Permissions.FLAGS.READ_MESSAGE_HISTORY,
            Permissions.FLAGS.ATTACH_FILES,
            Permissions.FLAGS.EMBED_LINKS,

            // Voice
            Permissions.FLAGS.CONNECT,
            Permissions.FLAGS.USE_VAD,
            Permissions.FLAGS.SPEAK,
        ],
        deny: [
            // Disable threads in tickets
            Permissions.FLAGS.USE_PUBLIC_THREADS,
            Permissions.FLAGS.USE_PRIVATE_THREADS,
        ],
    },
];
