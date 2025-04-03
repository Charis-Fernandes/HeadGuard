const { Server } = require('ws');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const wss = new Server({ port: 8080 });

console.log('WebSocket server starting on port 8080...');

// Open the serial port
const port = new SerialPort({
  path: 'COM3',
  baudRate: 115200,
  autoOpen: false
});

console.log('Attempting to open serial port COM3...');

port.open((err) => {
  if (err) {
    console.error('Error opening port:', err.message);
    console.error('Please check if:');
    console.error('1. Arduino is connected to COM3');
    console.error('2. No other program (like Arduino IDE) is using COM3');
    console.error('3. You have permissions to access COM3');
  } else {
    console.log('Serial port opened successfully.');
    
    // Add error handler for the port
    port.on('error', (err) => {
      console.error('Serial port error:', err.message);
    });

    // Add data handler directly on port for debugging
    port.on('data', (data) => {
      console.log('Raw data from port:', data);
    });
  }
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// Debug the parser
parser.on('error', (err) => {
  console.error('Parser error:', err.message);
});

// When we receive data from Arduino, send it to all connected clients
parser.on('data', (line) => {
  const data = line.trim();
  console.log('Parsed data from Arduino:', data);
  
  let clientCount = 0;
  wss.clients.forEach((client) => {
    if (client.readyState === 1) { // Check if client is ready
      client.send(data);
      clientCount++;
      console.log('Sent to client:', data);
    }
  });
  console.log(`Data sent to ${clientCount} clients`);
});

wss.on('connection', (ws) => {
  console.log('New client connected');
  console.log(`Total clients connected: ${wss.clients.size}`);
  
  ws.on('close', () => {
    console.log('Client disconnected');
    console.log(`Remaining clients: ${wss.clients.size}`);
  });
}); 