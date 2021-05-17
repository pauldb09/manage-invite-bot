const Command = require("../../structures/Command.js");

module.exports = class extends Command {
    constructor (client) {
        super(client, {
            name: "addrank",
            enabled: true,
            aliases: [ "ar" ],
            clientPermissions: [ "EMBED_LINKS", "MANAGE_ROLES" ],
            permLevel: 2
        });
    }

    async run (message) {

        return message.channel.send(message.translate("misc:RANKS_TOS", {
            link: this.client.config.discord
        }));

    }

};
