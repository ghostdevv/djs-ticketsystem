import { TicketChannelManager } from './TicketChannel/TicketChannelManager';
import { schema as cmSchema, defaultPermissions } from './options/create';
import { TicketSystemOptions, schema } from './options/TicketSystem';
import { createTicketChannel } from './TicketChannel/create';
import type { CreateOptions } from './options/create';
import { createTemplater } from './utils/templates';
import type { Client } from 'discord.js';

export class TicketSystem {
    private readonly options: TicketSystemOptions;
    private readonly client: Client;

    public readonly tickets;

    constructor(client: Client, options?: Partial<TicketSystemOptions>) {
        this.client = client;

        if (!client) throw new TypeError('Expected to recieve discord Client');

        const { error, value } = schema.validate(options);

        if (error) throw error.annotate();
        else this.options = value;

        this.tickets = new TicketChannelManager(this.client);
    }

    async create(options: CreateOptions) {
        const { error, value } = cmSchema.validate({
            ...this.options,
            ...options,
        });

        if (error) throw error.annotate();

        const ticketOptions: CreateOptions = {
            permissionOverwrites: defaultPermissions(),
            ...value,
        };

        const guild = await this.client.guilds.fetch(
            this.client.guilds.resolveId(ticketOptions.guild),
        );

        if (!guild)
            throw new TypeError(
                `Unable to find channel: ${ticketOptions.guild.toString()}`,
            );

        const owner = await guild.members.fetch(
            guild.members.resolveId(ticketOptions.owner),
        );

        if (!owner)
            throw new TypeError(`Unable to find owner: ${ticketOptions.owner}`);

        const templater = createTemplater({ owner, guild });

        return createTicketChannel(
            await guild.channels.create(
                templater.string(ticketOptions.name).slice(0, 32),
                templater.deep(ticketOptions),
            ),
            { owner },
        );
    }
}
