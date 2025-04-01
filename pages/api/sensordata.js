import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

let latestData = 'No data yet';

// Open the serial port. Update the path to match your system (e.g., "COM3" on Windows).
const port = new SerialPort({
  path: 'COM4', 
  baudRate: 115200,
  autoOpen: false
});

// Open the port once when the module loads.
port.open((err) => {
  if (err) {
    console.error('Error opening port:', err.message);
  } else {
    console.log('Serial port opened successfully.');
  }
});

// Set up a parser to split incoming data by newlines.
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// Listen for incoming data from the Arduino.
parser.on('data', (line) => {
  latestData = line.trim();
  console.log('Received from Arduino:', latestData);
});

export default function handler(req, res) {
  res.status(200).json({ data: latestData });
}
