import type { GuildChannel, GuildMember } from 'discord.js';
import type { TicketChannel } from './TicketChannel';

export interface CreateTicketChannelData {
    owner: GuildMember;
}

export const createTicketChannel = (
    channel: GuildChannel,
    { owner }: CreateTicketChannelData,
): TicketChannel => {
    const ticket = channel as TicketChannel;

    ticket.owner = () => owner;
    ticket._isTicketChannel = true;

    return ticket;
};
