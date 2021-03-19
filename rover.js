const Command = require('./command.js');
const Message = require('./message.js');
class Rover {
  // Write code here!

  //position
  constructor(position) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
    if (!position) {
      throw Error("Position required.");
    }
  }

  //message
  receiveMessage(message) {
    this.message = message.name;

    //Results for return object
    let results = [];

    //The result of each commandType combination
    let result;

    //If message DNE
    if (!message) {
      throw Error("Message required.");
    }

    //Show all possible combinations the rover will encounter
    for (let i = 0; i < message.commands.length; i++) {//FOR start
      //IF commandType is STATUS_CHECK
      if (message.commands[i].commandType === 'STATUS_CHECK') {
        result = {
          completed: true,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position
          }
        }
      }
      //IF commandType is MOVE
      else if (message.commands[i].commandType === 'MOVE') {
        //If Power is LOW, DO NOT MOVE
        if (this.mode === 'LOW_POWER') {
          this.position = this.position;
          result = {
            completed: false
          }
        }
        else {
          this.position = message.commands[i].value;
          result = {
            completed: true
          }
        }
      }
      //IF commandType is MODE_CHANGE
      else if (message.commands[i].commandType === 'MODE_CHANGE') {
        //IF Mode is switched to LOW_POWER
        if (message.commands[i].value === 'LOW_POWER') {
          this.mode = 'LOW_POWER';
          result = {
            completed: true
          }
        } else {
          this.mode = 'NORMAL';
          result = {
            completed: true
          }
        }
      }
      //IF commandType if none of the above
      else {
        // this.completed = false;
        result = {
          completed: false,
          message: 'Unknown Command'
        }
      }
      results.push(result);
    }//END FOR

    return { message: this.message, results }
  }

}
module.exports = Rover;