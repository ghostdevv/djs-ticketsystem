import Joi from 'joi';

export interface TicketSystemOptions {
    name: string;
}

export const schema = Joi.object<TicketSystemOptions>({
    name: Joi.string().min(1).max(32).default('{owner.user.username}-{id}'),
});
