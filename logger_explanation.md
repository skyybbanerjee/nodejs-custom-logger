```js
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
```

Let's break down the code step-by-step to understand its purpose and how it demonstrates **Event-Driven Architecture (EDA)** in Node.js.

---

### **1. Imports Required Modules**

```javascript
const fs = require("fs");
const os = require("os");
const EventEmitter = require("events"); // Class, not just an ordinary 'module'
```

- `fs`: The file system module is used to read and write files.
- `os`: Provides information about the operating system (e.g., free memory).
- `events`: A core Node.js module that provides the **EventEmitter** class, which is essential for event-driven architecture.

---

### **2. Defining a Custom EventEmitter Class**

```javascript
class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit("message", { message });
  }
}
```

- **Custom Class:** `Logger` extends the `EventEmitter` class, inheriting its event-handling functionality.
- **`log` Method:**
  - It logs the `message` to the console.
  - Emits a `message` event, passing an object `{ message }` as event data.
  
  This method demonstrates how a custom event is triggered when `log` is called.

---

### **3. Creating an Instance of Logger**

```javascript
const logger = new Logger();
```

- `logger` is an instance of the `Logger` class, which now has both the `log` method and the ability to emit/listen for events.

---

### **4. Log File Path**

```javascript
const logFile = "./eventlog.txt";
```

- This specifies the file (`eventlog.txt`) where log messages will be saved.

---

### **5. Defining the Event Listener (`logToFile`)**

```javascript
const logToFile = (event) => {
  const logMessage = `${new Date().toISOString()} - ${event.message} \n`;
  fs.appendFileSync(logFile, logMessage);
};
```

- **Event Listener Function:** `logToFile` is a function that listens for `message` events:
  - It takes the event object (containing the message) as an argument.
  - Constructs a log message with the current timestamp and the event message.
  - Appends the log message to the `eventlog.txt` file using `fs.appendFileSync`, which writes to the file synchronously.

---

### **6. Registering the Listener with the Logger**

```javascript
logger.on("message", logToFile);
```

- This binds the `logToFile` function to the `message` event of the `logger` instance.
- Every time a `message` event is emitted, the `logToFile` function will be executed.

---

### **7. Periodic Logging of Memory Usage**

```javascript
setInterval(() => {
  const memoryUsage = (os.freemem() / os.totalmem()) * 100;
  logger.log(`Current memory usage: ${memoryUsage.toFixed(2)}% ☑️`);
}, 3000);
```

- This `setInterval` function runs every 3 seconds (3000 milliseconds):
  - It calculates the percentage of free memory by dividing `os.freemem()` by `os.totalmem()`.
  - The result is formatted to two decimal places using `toFixed(2)`.
  - The formatted memory usage message is logged using `logger.log`.

  This triggers the `message` event, which in turn calls the `logToFile` function.

---

### **8. Initial Test Log Messages**

```javascript
logger.log("Application started...");
logger.log("Application event occurred ✅");
```

- These initial log messages demonstrate the basic functionality of the `logger` class.
- Each log triggers a `message` event, which will:
  - Print the message to the console.
  - Write the message to `eventlog.txt` along with a timestamp.

---

### **Event-Driven Architecture (EDA) in Action**

- **Core Concept:** EDA is a programming paradigm where events drive the flow of the application. Instead of polling for changes, the application responds to events as they occur.
- **Emitter & Listener:** In this example:
  - **Emitter:** The `logger.log` method emits the `message` event.
  - **Listener:** The `logToFile` function listens for the `message` event and responds by writing the log message to a file.

  This architecture decouples the act of logging a message from the actual handling of that message (e.g., writing to a file). We could add more listeners to the same event without changing the `log` method.

---

### **Summary**

This code demonstrates how to use the **`EventEmitter`** class in Node.js to implement **event-driven logging**:

1. A custom `Logger` class is created by extending `EventEmitter`.
2. The `logger.log` method emits a `message` event with a log message.
3. The `logToFile` function listens for `message` events and writes logs to a file.
4. Memory usage is logged every 3 seconds using `setInterval`.
5. EDA allows easy scalability—new listeners can be added without modifying the core `log` method.