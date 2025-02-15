const os = require("os");

console.log("💻 System Information:");
console.log(`OS Type: ${os.type()}`);
console.log(`Platform: ${os.platform()}`);
console.log(`Architecture: ${os.arch()}`);
console.log(`Total Memory: ${os.totalmem() / (1024 * 1024)} MB`);
console.log(`Free Memory: ${os.freemem() / (1024 * 1024)} MB`);
console.log(`Uptime: ${os.uptime()} seconds`);
console.log(`Host Name: ${os.hostname()}`);
console.log(`Home Directory: ${os.homedir()}`);
console.log("CPU Info:", os.cpus());

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