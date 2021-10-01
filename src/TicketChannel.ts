import { GuildChannel, GuildMember } from 'discord.js';

export type TicketChannel<T extends GuildChannel> = T & {
    owner: () => GuildMember;
};

export interface TicketChannelData {
    owner: GuildMember;
}

export const createTicketChannel = <T extends GuildChannel>(
    channel: T,
    { owner }: TicketChannelData,
): TicketChannel<T> => {
    const ticket = channel as TicketChannel<T>;

    ticket.owner = () => owner;

    return ticket;
};
