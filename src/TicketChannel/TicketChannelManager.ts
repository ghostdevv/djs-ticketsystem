import type { TicketChannelResolvable } from './TicketChannel';
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
