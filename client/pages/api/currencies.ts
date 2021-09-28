import { NextApiHandler } from 'next';
import { Server } from 'socket.io';
import WebSocket from 'ws';

const ioHandler: NextApiHandler = async (req, res) => {
  const socket = new WebSocket(
    `wss://ws.finnhub.io?token=${process.env.FINNHUB_KEY}`
  );

  const io = new Server((res as any).socket.server);

  (res as any).socket.server.io = io;

  // Connection opened -> Subscribe
  socket.addEventListener('open', (event) => {
    socket.send(JSON.stringify({ type: 'subscribe', symbol: 'OANDA:EUR_USD' }));
    socket.send(JSON.stringify({ type: 'subscribe', symbol: 'OANDA:GBP_USD' }));
    socket.send(JSON.stringify({ type: 'subscribe', symbol: 'OANDA:USD_CAD' }));
    socket.send(
      JSON.stringify({ type: 'subscribe', symbol: 'BINANCE:BTCUSDT' })
    );
  });

  // Listen for messages
  socket.addEventListener('message', function (event) {
    io.emit('currencies', event.data);
  });

  res.end();
};

export default ioHandler;
