const { Structures, Channel, MessageEmbed } = require('discord.js');
const { stringvar, optionsHelper } = require('../helpers');
const clonedeep = require('lodash.clonedeep');

Structures.extend('Guild', Guild => {

    /**
     * Extends the Guild class to implement ticket system methods.
     * @extends {Guild}
    */

    class ticketSystemGuild extends Guild {

        constructor(client, data) {
            super(client, data);
        };

        /**
         * Creates a ticket.
         * @param {Object} [options] Options for creating a ticket
         * @param {string} [options.name='ticket-{OWNER.USERNAME}'] The name of the ticket
         * @param {User} [options.owner] The owner of the ticket
         * @param {string} [options.type='text'] The type of the new channel, either `text`, `voice`, or `category`
         * @param {boolean} [options.nsfw] Whether the new channel is nsfw
         * @param {number} [options.bitrate] Bitrate of the new channel in bits (only voice)
         * @param {number} [options.userLimit] Maximum amount of users allowed in the new channel (only voice)
         * @param {ChannelResolvable|string} [options.parent] Parent of the new channel
         * @param {OverwriteResolvable[]|Collection<Snowflake, OverwriteResolvable>} [options.permissionOverwrites]
         * @param {number} [options.position] Position of the new channel
         * @param {number} [options.rateLimitPerUser] The ratelimit per user for the channel
         * @param {string} [options.reason] Reason for creating the channel
         * @param {Object} [options.openMessage] Options for the open message
         * @param {string} [options.openMessage.text] Send text message
         * @param {MessageEmbed} [options.reason.openMessage.embed] Send embeded message
         * @returns {Promise<GuildChannel>}
         * @example
         * guild.createTicket({ owner: message.author })
         *      .then(t => console.log('Created ticket'))
         *      .catch(console.error);
         */

        createTicket(options = {}) {

            const defaults = optionsHelper.get();

            options = clonedeep(Object.assign(defaults, options));

            return new Promise(async (resolve, reject) => {
                
                if ((typeof options.name != 'string')) return reject(new TypeError('Expected a type of string for options.name'));

                const svconfig = {
                    'OWNER': `<@${options.owner.id}>`,
                    'OWNER.USERNAME': options.owner.username,
                    'OWNER.TAG': options.owner.tag,
                    'OWNER.DISCRIMINATOR': options.owner.discriminator,
                    'OWNER.ID': options.owner.id,
                    'GUILD': this,
                    'GUILD.ID': this.id,
                    'GUILD.NAME': this.name
                };

                if ((typeof options.category == 'string')) {
                    options.category = this.channels.cache.get(options.category) || this.channels.cache.find(c => c.name == options.category);
                    if (!options.category) return reject(new Error('Unable to find a category with the given id/name'));
                };
                
                options.permissionOverwrites = options.permissionOverwrites.map(x => { x.id = stringvar(x.id, svconfig); return x; });

                this.channels.create(stringvar(options.name, svconfig), {
                    topic: `djts-${JSON.stringify({ owner: options.owner.id })}`,
                    type: options.type,
                    nsfw: options.nsfw,
                    bitrate: options.bitrate,
                    userLimit: options.userLimit,
                    parent: options.category,
                    permissionOverwrites: options.permissionOverwrites,
                    position: options.position,
                    rateLimitPerUser: options.rateLimitPerUser,
                    reason: options.reason
                })
                .then(ticket => {
                    if (options.openMessage && options.type == 'text') {
                        try {
                            ticket.send({
                                content: stringvar(options.openMessage.text, svconfig),
                                embed: stringvar(options.openMessage.embed, svconfig)
                            });
                            resolve(ticket);
                        }
                        catch (error) {
                            reject(error);
                        };
                    } else {
                        resolve(ticket);
                    };
                })
                .catch(reject);

            });

        };

    };

    return ticketSystemGuild;

});