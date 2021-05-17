const Command = require("../../structures/Command.js");

module.exports = class extends Command {
    constructor (client) {
        super(client, {
            name: "ranks",
            enabled: true,
            aliases: [ "ra" ],
            clientPermissions: [ "EMBED_LINKS" ],
            permLevel: 0
        });
    }

    async run (message) {

        return message.channel.send(message.translate("misc:RANKS_TOS", {
            link: this.client.config.discord
        }));

    }

};
