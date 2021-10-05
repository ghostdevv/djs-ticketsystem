import type { RawGuildChannelData } from 'discord.js/typings/rawDataTypes';
import type { TicketChannelResolvable } from '#types/TicketChannel';
import { Client, CachedManager } from 'discord.js';
import { TicketChannel } from './TicketChannel';

export class TicketChannelManager extends CachedManager<
    string,
    TicketChannel,
    TicketChannelResolvable
> {
    constructor(client: Client) {
        super(client, TicketChannel);
    }
}
