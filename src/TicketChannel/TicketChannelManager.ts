import type { TicketChannelResolvable } from './TicketChannel';
import type { Snowflake, Client } from 'discord.js';
import { Collection } from '@discordjs/collection';
import { TicketChannel } from './TicketChannel';

export class TicketChannelManager {
    public readonly cache = new Collection<Snowflake, TicketChannel>();

    public readonly client;

    constructor(client: Client) {
        this.client = client;
    }

    resolve(item: TicketChannelResolvable): TicketChannel | null {
        if (typeof item == 'string')
            return (this.cache.get(item) as TicketChannel) || null;

        if (item instanceof TicketChannel) return item;

        return null;
    }

    resolveId(item: string | TicketChannel) {
        const x = this.resolve(item);

        if (x) return x.id;
        else return null;
    }
}
