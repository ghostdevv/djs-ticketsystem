import { TicketSystemOptions, schema } from './options/TicketSystem';
import type { Client, Guild, GuildMember } from 'discord.js';
import { createTemplater } from './utils/templates';

interface CreateOptions extends TicketSystemOptions {
    owner: string | GuildMember;
    guild: string | Guild;
}

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
        ownerResolvable: string | GuildMember,
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

        const owner = await guild.members.fetch(
            guild.members.resolveId(ownerResolvable),
        );

        if (!owner)
            throw new TypeError(`Unable to find owner: ${ownerResolvable}`);

        const templater = createTemplater({ owner });

        const ticketChannel = await guild.channels.create(
            templater(ticketOptions.name).slice(0, 32),
        );
    }
}
