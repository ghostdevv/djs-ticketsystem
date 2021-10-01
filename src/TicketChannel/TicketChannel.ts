import type { RawGuildChannelData } from 'discord.js/typings/rawDataTypes';
import type { Client, Guild, GuildMember, Snowflake } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import { GuildChannel } from 'discord.js';
import pkg from '../../package.json';
import axios from 'axios';

export type TicketChannelResolvable = Snowflake | TicketChannel | GuildChannel;

export interface TicketChannelDataOptions {
    owner: GuildMember;
}

export type TicketChannelFromData = TicketChannelDataOptions & {
    client: Client;
    guild: Guild;
};

export type TicketChannelData = RawGuildChannelData & TicketChannelDataOptions;

export class TicketChannel extends GuildChannel {
    public readonly owner: GuildMember;

    constructor(guild: Guild, data: TicketChannelData) {
        super(guild, data);

        this.owner = data.owner;
    }

    static async from(
        channelId: string,
        { client, guild, ...options }: TicketChannelFromData,
    ): Promise<TicketChannel> {
        const res = await axios(
            'https://discord.com/api' + Routes.channel(channelId),
            {
                headers: {
                    Authorization: `Bot ${client.token}`,
                    'User-Agent': `djs-ticketsystem / v${pkg.version}`,
                },
            },
        );

        const data = res.data as RawGuildChannelData;

        return new TicketChannel(guild, { ...options, ...data });
    }
}
