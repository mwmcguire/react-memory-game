// Dependencies
const express = require('express');
const http = require('http');
// const socketIo = require('socket.io');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
// const io = socketIo(server);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Set static folder
app.use(express.static('client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Start server
server.listen(PORT, error => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Server listening on port ${PORT}`);
  }
});
