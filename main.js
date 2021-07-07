const { EventEmitter } = require('events');
const { resolve } = require('path');
const fs = require('fs');
const commandRunner = require('../../commandRunner')
const mcCommandRunner = require('../minecraft/mcCommandRunner')

let logger
let camellib

module.exports = class plugin extends EventEmitter {
    constructor(parameters){
        super();
        logger = parameters.logger
        camellib = parameters.camellib
        parameters.logger.info("Example plugin has been loaded")
    }   
    /**
     * 
     * @param {commandRunner|mcCommandRunner} lol 
     */
    singCommand(lol){
        if(lol.source=='discord'){
            lol.interaction.reply("Singing now")
            for(let i = 0; i<lol.interaction.options.get('value').value; i++){
                lol.interaction.channel.send("la")
            }
        }
        if(lol.source=='minecraft'){
            lol.game.socket.write(JSON.stringify({
                "packet":"command",
                "command":"tellraw @a {\"text\":\"Singing now\"}"
            })+"\n");
            for (let i = 0; i < parseInt(lol.args[0]); i++){
                lol.game.socket.write(JSON.stringify({
                    "packet":"command",
                    "command":"tellraw @a {\"text\":\"la\"}"
                })+"\n");
            }
        }
    }
    onChat(message){
        if(message.content.includes("example")){
            return(true)
        }
        if(message.content.includes("yeet")){
            message.content = message.content.replace("yeet","lol")
            return(false)
        }
    }

}
