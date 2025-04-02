import { Server } from 'ws';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

let wss;

if (!global.wss) {
  wss = new Server({ port: 8080 });
  global.wss = wss;

  // Open the serial port
  const port = new SerialPort({
    path: 'COM4',
    baudRate: 115200,
    autoOpen: false
  });

  port.open((err) => {
    if (err) {
      console.error('Error opening port:', err.message);
    } else {
      console.log('Serial port opened successfully.');
    }
  });

  const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

  // When we receive data from Arduino, send it to all connected clients
  parser.on('data', (line) => {
    const data = line.trim();
    console.log('Received from Arduino:', data);
    
    wss.clients.forEach((client) => {
      if (client.readyState === 1) { // Check if client is ready
        client.send(data);
      }
    });
  });
}

export default function handler(req, res) {
  res.status(200).json({ message: 'WebSocket server is running' });
} 