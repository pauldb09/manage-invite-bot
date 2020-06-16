const { Collection } = require("discord.js");

module.exports = class Subscription {
    constructor(handler, { id, data }) {

        this.id = id;

        this.handler = handler;
        this.handler.subscriptionCache.set(this.id, this);

        // Expiration date
        this.expiresAt = data.expires_at ? new Date(data.expires_at).getTime() : null;
        // Subscription label
        this.label = data.sub_label;
    }

    get active () {
        return this.expiresAt > Date.now();
    }

    get isTrial () {
        return this.label === 'Trial Version';
    }

    get wasTrial () {
        return this.label.startsWith('T-');
    }

    async changeLabel (newName) {
        this.label = this.isTrial ? 'Trial Version' : `T-${newName}`;
        await this.handler.query(`
            UPDATE subscriptions
            SET sub_label = '${this.label}'
            WHERE sub_id = ${this.id};
        `);
        this.handler.syncSubscriptionForOtherCaches(this.id);
    }

    async addDays(count){
        const ms = count*24*60*60*1000;
        if(this.expiresAt >= Date.now()){
            this.expiresAt += ms;
        } else {
            this.expiresAt = Date.now() + ms;
        }
        this.handler.syncSubscriptionForOtherCaches(this.id);
    }

};