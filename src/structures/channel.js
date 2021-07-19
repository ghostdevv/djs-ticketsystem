const { Structures } = require('discord.js');
const { stringvar, optionsHelper } = require('../helpers');

Structures.extend('TextChannel', (TextChannel) => {
    /**
     * Extends the TextChannel class to implement ticket system methods.
     * @extends {TextChannel}
     */

    class textChannelManager extends TextChannel {
        constructor(guild, data) {
            super(guild, data);
        }

        /**
         * Return a boolean for whether a channel is a ticket or not
         * @type {boolean}
         * @readonly
         */

        isTicket() {
            return !(!this.topic || !this.topic.startsWith('djts-'));
        }
    }

    return textChannelManager;
});
