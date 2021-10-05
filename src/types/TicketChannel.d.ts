import type { RawGuildChannelData } from 'discord.js/typings/rawDataTypes';
import type { TicketChannel } from '../TicketChannel/TicketChannel';
import type { GuildMember, Snowflake } from 'discord.js';

export type TicketChannelResolvable = Snowflake | TicketChannel;

export interface TicketChannelDataMeta {
    owner: GuildMember;
}

export type TicketChannelData = RawGuildChannelData & TicketChannelDataMeta;
