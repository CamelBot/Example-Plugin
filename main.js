const { EventEmitter } = require('events');
const { resolve } = require('path');
const fs = require('fs');
const commandRunner = require('../../commandRunner')

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
     * @param {commandRunner} lol 
     */
    singCommand(lol){
        if(lol.source=='discord'){
            lol.interaction.reply("Singing now")
            for(let i = 0; i<lol.interaction.options.get('value').value; i++){
                lol.interaction.channel.send("la")
            }
        }
    }

}
