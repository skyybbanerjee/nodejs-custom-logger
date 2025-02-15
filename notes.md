### **Event-Driven Architecture (EDA) in Node.js**
---

Event-Driven Architecture is a software design pattern where components communicate and interact through events. Node.js, being built on this architecture, heavily relies on events to manage asynchronous operations. In this architecture, actions or events trigger responses, rather than relying on direct function calls or continuous polling.

---

### **How Event-Driven Architecture Works**
1. **Event Emitter:** 
   - An object that emits events. When an event is emitted, all the listeners registered for that event are called.
   
2. **Event Listener:**
   - A function that waits for a specific event to occur. Once the event is emitted, the listener executes a callback function.

3. **Pub/Sub Pattern:** 
   - Publishers emit events, and subscribers (listeners) react to those events without knowing about each other's internal details.

---

### **Core Concepts in Node.js EDA**

1. **`EventEmitter` Class:**
   - Node.js has a built-in `events` module with an `EventEmitter` class, which is at the core of EDA in Node.js.

   - Example:
     ```javascript
     const EventEmitter = require('events');
     const eventEmitter = new EventEmitter();

     // Define a listener
     eventEmitter.on('greet', (name) => {
       console.log(`Hello, ${name}!`);
     });

     // Emit the event
     eventEmitter.emit('greet', 'Skyy');
     ```

   - **Explanation:**
     - `on('greet', callback)` sets up a listener for the `greet` event.
     - `emit('greet', 'Skyy')` triggers the event, which invokes the listener.

2. **Asynchronous Nature:**
   - Node.js handles multiple events concurrently using its non-blocking, single-threaded event loop.
   - When an event is emitted, its listeners are executed asynchronously without blocking the main thread.

3. **Error Handling in Events:**
   - You can listen for `error` events to gracefully handle errors in your application:
     ```javascript
     eventEmitter.on('error', (err) => {
       console.error(`Error occurred: ${err.message}`);
     });

     eventEmitter.emit('error', new Error('Something went wrong!'));
     ```

---

### **Advantages of Event-Driven Architecture in Node.js**

1. **Scalability:**
   - EDA allows easy handling of many connections or events, making it suitable for real-time applications (e.g., chats, notifications).

2. **Decoupling:**
   - Components remain loosely coupled. The event publisher and the event listeners don't need to know about each other's existence.

3. **Asynchronous Handling:**
   - EDA leverages Node.js's non-blocking I/O for better performance under heavy loads.

4. **Flexibility:**
   - Events can be chained, queued, or broadcast to multiple listeners, providing flexibility in how the system behaves.

---

### **Common Use Cases of EDA in Node.js**

1. **Web Servers:**
   - Node.js HTTP servers are event-driven. Requests and responses are handled through events.

     ```javascript
     const http = require('http');
     
     const server = http.createServer((req, res) => {
       res.writeHead(200, { 'Content-Type': 'text/plain' });
       res.end('Hello, World!');
     });

     server.listen(3000, () => {
       console.log('Server is listening on port 3000');
     });
     ```

2. **Real-Time Applications:**
   - WebSockets and frameworks like `Socket.IO` use EDA to send real-time updates to clients.

3. **File System I/O:**
   - File operations in Node.js are asynchronous and event-driven:
     ```javascript
     const fs = require('fs');

     fs.readFile('example.txt', 'utf8', (err, data) => {
       if (err) throw err;
       console.log(data);
     });
     ```

4. **Streams:**
   - Node.js streams (used for reading and writing data) are inherently event-driven. They emit events like `data`, `end`, and `error`.

---

### **Event Loop in Node.js**
- The event loop is the heart of Node.js’s event-driven architecture.
- It continuously checks for new events and executes their corresponding listeners.
- **Steps in the Event Loop:**
  1. Executes any synchronous code.
  2. Processes I/O events (like file reads, HTTP requests).
  3. Executes queued timers (e.g., `setTimeout`).
  4. Handles events emitted by the `EventEmitter`.

---

### **Conclusion**
Event-Driven Architecture is essential to how Node.js operates. It allows for efficient handling of asynchronous tasks and provides flexibility and scalability. Understanding EDA is crucial for building robust, real-time, and performant Node.js applications.

### **What is an Event in Node.js?**
In Node.js, an **event** is a signal that indicates something has happened in the application. It could represent a wide range of actions, such as:

- A user request (e.g., an HTTP request arriving at a server).
- Completion of a file read/write operation.
- A WebSocket message received.
- A custom action or notification triggered by the developer.

### **How Node.js Uses Events**
Node.js is built on an **event-driven architecture**, meaning the application listens for events and reacts to them using callback functions (also known as event listeners). This model enables Node.js to efficiently handle multiple concurrent operations without blocking the main thread.

---

### **What is an EventEmitter in Node.js?**
The `EventEmitter` is a core class in Node.js provided by the `events` module. It is used to manage and trigger custom events in your application. 

- It allows one part of your code to emit an event and another part to listen for that event and execute a function in response.

### **Basic Usage of EventEmitter**

1. **Importing the events module:**
   ```javascript
   const EventEmitter = require('events');
   const eventEmitter = new EventEmitter();
   ```

2. **Setting Up a Listener:**
   - `eventEmitter.on(eventName, listenerFunction)` is used to listen for an event:
     ```javascript
     eventEmitter.on('greet', (name) => {
       console.log(`Hello, ${name}!`);
     });
     ```

3. **Emitting an Event:**
   - `eventEmitter.emit(eventName, ...args)` is used to trigger the event:
     ```javascript
     eventEmitter.emit('greet', 'Skyy'); // Output: Hello, Skyy!
     ```

---

### **Explanation of Key Methods**
1. **`on(event, listener)`**:
   - Adds a listener for a specific event.
   - Example:
     ```javascript
     eventEmitter.on('sayHi', () => {
       console.log('Hi there!');
     });
     eventEmitter.emit('sayHi'); // Output: Hi there!
     ```

2. **`emit(event, ...args)`**:
   - Triggers the event and calls all registered listeners.
   - The arguments can be passed to the listener function.
   
3. **`removeListener(event, listener)`**:
   - Removes a specific listener for an event.

4. **`once(event, listener)`**:
   - Registers a listener that will be called only once. After being called, it is automatically removed.
   - Example:
     ```javascript
     eventEmitter.once('oneTime', () => {
       console.log('This will run only once.');
     });
     eventEmitter.emit('oneTime'); // Output: This will run only once.
     eventEmitter.emit('oneTime'); // No output
     ```

---

### **Practical Example: Using EventEmitter in a Web Server**
```javascript
const http = require('http');
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('requestReceived', (req) => {
  console.log(`Request received for URL: ${req.url}`);
});

const server = http.createServer((req, res) => {
  eventEmitter.emit('requestReceived', req);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

In this example:
- Every time a request is made to the server, the `requestReceived` event is emitted.
- The listener logs the request URL to the console.

---

### **Use Cases of EventEmitter**
1. **Logging:**
   - Logging system events or errors.
   
2. **Streams:**
   - File or network streams in Node.js emit events like `data`, `end`, or `error`.

3. **Real-Time Communication:**
   - WebSockets or real-time apps can emit events when messages are sent/received.

4. **Custom Notifications:**
   - Trigger custom actions in response to specific events.

---

### **Conclusion**
In summary:
- **Events** in Node.js are signals indicating that something happened.
- **EventEmitter** is a class that enables managing events and listeners.
- By leveraging EventEmitter, Node.js applications can efficiently implement event-driven behavior for handling asynchronous operations and building real-time systems.

### **What are WebSockets?**

WebSockets are a **full-duplex communication protocol** that enables real-time, bidirectional communication between a client (usually a browser) and a server over a single persistent connection.

Unlike the traditional HTTP request-response model, where the client must continuously send requests to the server to receive updates (polling), WebSockets allow both the client and server to send and receive messages at any time without the need to establish a new connection.

---

### **How WebSockets Work**

1. **Connection Establishment:**
   - The client sends an initial **HTTP request** with an "Upgrade" header to the server, requesting to switch to the WebSocket protocol.
   - If the server supports WebSockets, it responds with a "101 Switching Protocols" status, upgrading the connection to WebSocket.

2. **Persistent Connection:**
   - Once the connection is established, it remains open. Both the client and server can send messages independently without waiting for each other.

3. **Message Exchange:**
   - Data is exchanged using lightweight **frames**. These frames can be either **text** or **binary**.

---

### **Why Use WebSockets?**

1. **Real-Time Communication:**  
   - Ideal for applications that require instantaneous updates, such as chat apps, online games, financial dashboards, etc.

2. **Efficiency:**  
   - WebSockets eliminate the need for repeated HTTP requests (polling), reducing latency and bandwidth usage.

3. **Low Latency:**  
   - Since the connection remains open, there is minimal delay in transmitting data.

---

### **Use Cases for WebSockets**

1. **Chat Applications:**  
   - Enables real-time messaging without delay.

2. **Online Gaming:**  
   - Facilitates fast, real-time interactions between players.

3. **Financial Market Data:**  
   - Streams real-time stock prices and financial updates.

4. **Collaborative Tools:**  
   - Live document editing and collaborative whiteboards.

5. **IoT Devices:**  
   - Transmits data to and from IoT devices efficiently.

---

### **WebSocket Example in Node.js**

Using the `ws` library (a popular WebSocket library for Node.js):

1. **Installing the WebSocket Library:**
   ```bash
   npm install ws
   ```

2. **Simple WebSocket Server:**
   ```javascript
   const WebSocket = require('ws');

   const server = new WebSocket.Server({ port: 8080 });

   server.on('connection', (socket) => {
     console.log('Client connected');

     // Send a message to the client
     socket.send('Welcome to the WebSocket server!');

     // Listen for messages from the client
     socket.on('message', (message) => {
       console.log(`Received: ${message}`);
     });

     // Handle disconnection
     socket.on('close', () => {
       console.log('Client disconnected');
     });
   });

   console.log('WebSocket server is running on ws://localhost:8080');
   ```

3. **Simple WebSocket Client (in the browser):**
   ```javascript
   const socket = new WebSocket('ws://localhost:8080');

   // Listen for messages from the server
   socket.onmessage = (event) => {
     console.log(`Server says: ${event.data}`);
   };

   // Send a message to the server
   socket.send('Hello, server!');
   ```

---

### **Advantages of WebSockets**

1. **Bi-Directional Communication:**  
   Both client and server can send messages at any time.

2. **Low Overhead:**  
   WebSockets have a smaller overhead compared to traditional HTTP requests, making them faster and more efficient.

3. **Persistent Connection:**  
   A single connection is used throughout the session, reducing the time and resources needed to establish multiple connections.

---

### **Challenges with WebSockets**

1. **Connection Management:**  
   Handling connection drops and retries can be challenging.

2. **Scalability:**  
   WebSocket servers may need additional infrastructure to manage thousands of concurrent connections.

3. **Security:**  
   WebSockets need to be secured using the `wss://` protocol (WebSocket over TLS/SSL) to protect against attacks like eavesdropping or man-in-the-middle attacks.

---

### **Conclusion**

WebSockets provide a powerful way to implement real-time communication between clients and servers. By enabling bi-directional, persistent connections, WebSockets are ideal for use cases like chat apps, gaming, financial dashboards, and more.

### **OS Module in Node.js**

The **`os` module** in Node.js is a built-in module that provides an interface for interacting with the underlying **operating system (OS)**. It enables us to access system information such as CPU details, memory usage, network interfaces, and more.

To use the `os` module, we simply import it:

```javascript
const os = require('os');
```

---

### **Common Functions and Their Usage**

Here are some of the most useful methods of the `os` module:

---

### **1. `os.arch()`**
- **Purpose:** Returns the CPU architecture of the system.
- **Example:**
  ```javascript
  console.log(`Architecture: ${os.arch()}`);
  // Example output: 'x64'
  ```

---

### **2. `os.platform()`**
- **Purpose:** Returns the operating system platform.
- **Example:**
  ```javascript
  console.log(`Platform: ${os.platform()}`);
  // Example output: 'linux', 'darwin' (macOS), 'win32' (Windows)
  ```

---

### **3. `os.type()`**
- **Purpose:** Returns the name of the operating system.
- **Example:**
  ```javascript
  console.log(`OS Type: ${os.type()}`);
  // Example output: 'Linux', 'Windows_NT', or 'Darwin'
  ```

---

### **4. `os.uptime()`**
- **Purpose:** Returns the system uptime in seconds.
- **Example:**
  ```javascript
  console.log(`System Uptime: ${os.uptime()} seconds`);
  ```

---

### **5. `os.totalmem()`**
- **Purpose:** Returns the total memory of the system in bytes.
- **Example:**
  ```javascript
  console.log(`Total Memory: ${os.totalmem() / (1024 * 1024)} MB`);
  ```

---

### **6. `os.freemem()`**
- **Purpose:** Returns the available free memory of the system in bytes.
- **Example:**
  ```javascript
  console.log(`Free Memory: ${os.freemem() / (1024 * 1024)} MB`);
  ```

---

### **7. `os.cpus()`**
- **Purpose:** Returns an array of objects containing information about each CPU/core installed on the system.
- **Example:**
  ```javascript
  console.log('CPU Info:', os.cpus());
  ```

  - Each object in the array has properties like:
    - `model` – CPU model
    - `speed` – CPU speed in MHz
    - `times` – Time spent in different CPU states (user, nice, sys, idle, irq)

---

### **8. `os.networkInterfaces()`**
- **Purpose:** Returns an object containing the network interfaces that are assigned to the system.
- **Example:**
  ```javascript
  console.log('Network Interfaces:', os.networkInterfaces());
  ```

  - The output is a list of network interfaces with information such as the IP address, MAC address, and family (IPv4 or IPv6).

---

### **9. `os.hostname()`**
- **Purpose:** Returns the hostname of the system.
- **Example:**
  ```javascript
  console.log(`Hostname: ${os.hostname()}`);
  ```

---

### **10. `os.homedir()`**
- **Purpose:** Returns the home directory of the current user.
- **Example:**
  ```javascript
  console.log(`Home Directory: ${os.homedir()}`);
  ```

---

### **11. `os.tmpdir()`**
- **Purpose:** Returns the default directory for temporary files.
- **Example:**
  ```javascript
  console.log(`Temporary Directory: ${os.tmpdir()}`);
  ```

---

### **12. `os.release()`**
- **Purpose:** Returns the operating system release.
- **Example:**
  ```javascript
  console.log(`OS Release: ${os.release()}`);
  ```

---

### **13. `os.constants`**
- **Purpose:** Provides operating system-specific constants for errors, signals, and process priorities.
- **Example:**
  ```javascript
  console.log('OS Constants:', os.constants);
  ```

---

### **Practical Example: System Info Display**

Here’s a simple example that displays detailed system information:

```javascript
const os = require('os');

console.log('💻System Information:');
console.log(`OS Type: ${os.type()}`);
console.log(`Platform: ${os.platform()}`);
console.log(`Architecture: ${os.arch()}`);
console.log(`Total Memory: ${os.totalmem() / (1024 * 1024)} MB`);
console.log(`Free Memory: ${os.freemem() / (1024 * 1024)} MB`);
console.log(`Uptime: ${os.uptime()} seconds`);
console.log(`Host Name: ${os.hostname()}`);
console.log(`Home Directory: ${os.homedir()}`);
console.log('CPU Info:', os.cpus());

/*
💻 System Information:
OS Type: Windows_NT
Platform: win32
Architecture: x64
Total Memory: 7932.69921875 MB
Free Memory: 1473.9765625 MB
Uptime: 146614.546 seconds
Host Name: DESKTOP-PK42N06
Home Directory: C:\Users\ASUS
CPU Info: [
  {
    model: 'Intel(R) Core(TM) i5-1035G1 CPU @ 1.00GHz',
    speed: 1190,
    times: {
      user: 3735265,
      nice: 0,
      sys: 3380890,
      idle: 42416531,
      irq: 513812
    }
  },
  {
    model: 'Intel(R) Core(TM) i5-1035G1 CPU @ 1.00GHz',
    speed: 1190,
    times: {
      user: 3418546,
      nice: 0,
      sys: 2252000,
      idle: 43862093,
      irq: 226359
    }
  },
  {
    model: 'Intel(R) Core(TM) i5-1035G1 CPU @ 1.00GHz',
    speed: 1190,
    times: {
      user: 4744437,
      nice: 0,
      sys: 2828718,
      idle: 41959484,
      irq: 273140
    }
  },
  {
    model: 'Intel(R) Core(TM) i5-1035G1 CPU @ 1.00GHz',
    speed: 1190,
    times: {
      user: 3949281,
      nice: 0,
      sys: 2269296,
      idle: 43314062,
      irq: 194703
    }
  },
  {
    model: 'Intel(R) Core(TM) i5-1035G1 CPU @ 1.00GHz',
    speed: 1190,
    times: {
      user: 2027640,
      nice: 0,
      sys: 1166156,
      idle: 46338843,
      irq: 114687
    }
  },
  {
    model: 'Intel(R) Core(TM) i5-1035G1 CPU @ 1.00GHz',
    speed: 1190,
    times: { user: 1299890, nice: 0, sys: 653312, idle: 47579437, irq: 61406 }
  },
  {
    model: 'Intel(R) Core(TM) i5-1035G1 CPU @ 1.00GHz',
    speed: 1190,
    times: { user: 1684421, nice: 0, sys: 904156, idle: 46944062, irq: 97875 }
  },
  {
    model: 'Intel(R) Core(TM) i5-1035G1 CPU @ 1.00GHz',
    speed: 1190,
    times: { user: 1300500, nice: 0, sys: 618828, idle: 47613312, irq: 60500 }
  }
]
*/
```
---

### **Use Cases of the OS Module**

1. **System Monitoring Tools:**  
   Used to build tools that monitor system performance and status.

2. **Environment-Based Logic:**  
   Determine the platform or OS type to run platform-specific code.

3. **Diagnostics and Logging:**  
   Collect system information for logging or troubleshooting.

4. **Network Configuration:**  
   Access network interface details for connectivity monitoring or configuration.

---

### **Conclusion**

The `os` module in Node.js is a powerful utility for accessing and interacting with system information. Whether we are building system monitoring tools, logging utilities, or platform-specific scripts, the `os` module provides everything we need to understand the environment our Node.js application is running in.