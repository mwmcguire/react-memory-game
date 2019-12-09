// Dependencies
const express = require('express');
const path = require('path');
const logger = require('morgan');
const PORT = process.env.PORT || 5000;
const app = express();
// const socketIo = require('socket.io');
// const io = socketIo(server);

// Middleware
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start server
app.listen(PORT, error => {
  if (error) {
    console.error(error);
  } else {
    console.log(`🌎  ==> Server listening on port ${PORT}`);
  }
});
