import type { RawGuildChannelData } from 'discord.js/typings/rawDataTypes';
import { Client, Guild, GuildMember, TextChannel } from 'discord.js';
import type { TicketChannelDataMeta } from '#types/TicketChannel';
import type { TicketChannelData } from '#types/TicketChannel';
import { createRequest } from '../utils/request';

export class TicketChannel extends TextChannel {
    public readonly owner: GuildMember;
    public readonly _data: TicketChannelData;

    constructor(guild: Guild, data: TicketChannelData) {
        super(guild, data);

        this.owner = data.owner;
        this._data = data;
    }

    static async getRawData(id: string, client: Client) {
        const res = await createRequest(client.token || '')(`/channels/${id}`);
        return res.data as RawGuildChannelData;
    }

    static async fromFetch(
        channelId: string,
        client: Client,
        guild: Guild,
        options: TicketChannelDataMeta,
    ) {
        const data = await TicketChannel.getRawData(channelId, client);
        return TicketChannel.from(guild, { ...options, ...data });
    }

    static from(guild: Guild, data: TicketChannelData): TicketChannel {
        return new TicketChannel(guild, data);
    }
}
