import { TicketSystemOptions, schema } from './options';
import type { Client, Guild } from 'discord.js';
import pupa from 'pupa';

const templates = {};

export class TicketSystem {
    private options: TicketSystemOptions;
    private client: Client;

    private tickets = new Map<string, string>();

    constructor(client: Client, options?: Partial<TicketSystemOptions>) {
        this.client = client;
        if (!client) throw new TypeError('Expected to recieve discord Client');

        const { error, value } = schema.validate(options);

        if (error) throw error.annotate();
        else this.options = value;
    }

    async create(
        guildResolvable: string | Guild,
        options: Partial<TicketSystemOptions>,
    ) {
        const { error, value } = schema.validate({
            ...this.options,
            ...options,
        });

        if (error) throw error.annotate();

        const ticketOptions: TicketSystemOptions = value;

        const guild = await this.client.guilds.fetch(
            this.client.guilds.resolveId(guildResolvable),
        );

        if (!guild)
            throw new TypeError(
                `Unable to find channel: ${guildResolvable.toString()}`,
            );

        // Todo templating
        const ticketChannel = await guild.channels.create(ticketOptions.name);
    }
}
