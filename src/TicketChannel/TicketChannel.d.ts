import type { GuildChannel, GuildMember, Snowflake } from 'discord.js';

export type TicketChannel = GuildChannel & {
    owner: () => GuildMember;
    _isTicketChannel: boolean;
};

export type TicketChannelResolvable = Snowflake | TicketChannel;
