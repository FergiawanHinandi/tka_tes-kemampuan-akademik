const { io } = require('socket.io-client');

const SERVER_URL = 'http://localhost:3000/exam';
const TOTAL_CLIENTS = 5000;
const BATCH_SIZE = 100;
const INTERVAL_MS = 1000;

console.log(`Starting stress test with ${TOTAL_CLIENTS} clients...`);

let connectedCount = 0;

function createClient(id) {
  const socket = io(SERVER_URL, {
    transports: ['websocket'],
    forceNew: true,
  });

  socket.on('connect', () => {
    connectedCount++;
    if (connectedCount % 100 === 0) {
      console.log(`Connected: ${connectedCount}/${TOTAL_CLIENTS}`);
    }
    
    // Simulate periodic activity
    setInterval(() => {
      if (socket.connected) {
        socket.emit('submitAnswer', {
          studentId: `STRESS-${id}`,
          questionId: 'Q-' + Math.floor(Math.random() * 50),
          answer: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]
        });
      }
    }, 30000 + Math.random() * 10000);
  });

  socket.on('connect_error', (err) => {
    console.error(`Client ${id} error:`, err.message);
  });
}

let batchCount = 0;
const timer = setInterval(() => {
  for (let i = 0; i < BATCH_SIZE; i++) {
    const clientId = batchCount * BATCH_SIZE + i;
    if (clientId >= TOTAL_CLIENTS) {
      clearInterval(timer);
      break;
    }
    createClient(clientId);
  }
  batchCount++;
}, INTERVAL_MS);
