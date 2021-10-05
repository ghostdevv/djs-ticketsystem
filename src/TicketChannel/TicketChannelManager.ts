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

        client.ws.on('CHANNEL_UPDATE', (data: RawGuildChannelData) => {
            const existingTicket = this.cache.get(data.id);

            if (existingTicket)
                this.cache.set(
                    data.id,
                    TicketChannel.from(existingTicket.guild, {
                        ...existingTicket._data,
                        ...data,
                    }),
                );
        });
    }
}
