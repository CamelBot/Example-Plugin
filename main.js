const { EventEmitter } = require('events');

module.exports = class plugin extends EventEmitter {
    /**
     * 
     * @param {import('../../mappedClass')} parameters 
     */
    constructor(parameters) {
        super();
        parameters.logger.info('Example plugin has been loaded');
    }
    /**
     * 
     * @param {import('../../commandRunner')|import('../minecraft/mcCommandRunner')} lol 
     */
    singCommand(lol) {
        if (lol.source == 'discord') {
            lol.interaction.reply('Singing now');
            for (let i = 0; i < lol.interaction.options.get('value').value; i++) {
                lol.interaction.channel.send('la');
            }
        }
        if (lol.source == 'minecraft') {
            lol.game.socket.write(JSON.stringify({
                'packet': 'command',
                'command': 'tellraw @a {"text":"Singing now"}'
            }) + '\n');
            for (let i = 0; i < parseInt(lol.args[0]); i++) {
                lol.game.socket.write(JSON.stringify({
                    'packet': 'command',
                    'command': 'tellraw @a {"text":"la"}'
                }) + '\n');
            }
        }
    }
    /**
     * 
     * @param {import('../minecraft/chatMessage')} message 
     * @returns {undefined}
     */
    onChat(message) {
        if (message.content.includes('example')) {
            return (true);
        }
        if (message.content.includes('yeet')) {
            message.content = message.content.replace('yeet', 'lol');
            return (false);
        }
    }

};
