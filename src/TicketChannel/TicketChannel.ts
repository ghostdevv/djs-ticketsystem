import type { RawGuildChannelData } from 'discord.js/typings/rawDataTypes';
import { Client, Guild, GuildMember, TextChannel } from 'discord.js';
import type { TicketChannelDataMeta } from '#types/TicketChannel';
import type { TicketChannelData } from '#types/TicketChannel';
import { createRequest } from '../utils/request';

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
