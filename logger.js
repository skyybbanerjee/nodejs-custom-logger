//Event Driven Architecture in NodeJs🟢

const fs = require("fs");
const os = require("os");

const EventEmitter = require("events"); //class, not an ordinary 'module'
//other classes - Error

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit("message", { message });
  }
}

const logger = new Logger();
const logFile = "./eventlog.txt";

const logToFile = (event) => {
  const logMessage = `${new Date().toISOString()} - ${event.message} \n`;
  fs.appendFileSync(logFile, logMessage);
};

logger.on("message", logToFile); //EDA

setInterval(() => {
  const memoryUsage = (os.freemem() / os.totalmem()) * 100;
  logger.log(`Current memory usage: ${memoryUsage.toFixed(2)}% ☑️`);
}, 3000);

//testing..
logger.log("Application started...");
logger.log("Application event occurred ✅");

/*
Application event occurred ✅
Current memory usage: 20.97% ☑️
Current memory usage: 21.49% ☑️
Current memory usage: 21.74% ☑️
Current memory usage: 21.59% ☑️
Current memory usage: 21.87% ☑️ ....
 */