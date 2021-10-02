import { Client, Guild, GuildMember, Snowflake, TextChannel } from 'discord.js';
import type { RawGuildChannelData } from 'discord.js/typings/rawDataTypes';
import { createRequest } from '../utils/request';

export type TicketChannelResolvable = Snowflake | TicketChannel;

export interface TicketChannelDataOptions {
    owner: GuildMember;
}

export type TicketChannelFromData = TicketChannelDataOptions & {
    client: Client;
    guild: Guild;
};

export type TicketChannelData = RawGuildChannelData & TicketChannelDataOptions;

export class TicketChannel extends TextChannel {
    public readonly owner: GuildMember;

    constructor(guild: Guild, data: TicketChannelData) {
        super(guild, data);

        this.owner = data.owner;
    }

    static async from(
        channelId: string,
        { client, guild, ...options }: TicketChannelFromData,
    ): Promise<TicketChannel> {
        const res = await createRequest(client.token || '')(
            `/channels/${channelId}`,
        );

        const data = res.data as RawGuildChannelData;

        return new TicketChannel(guild, { ...options, ...data });
    }
}
