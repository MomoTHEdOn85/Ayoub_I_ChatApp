const express = require('express');  //import the express package 
const app = express(); // create an express app 
const http = require('http'); // import the Node server package
const server = http.createServer(app); // use our app file with the server

// add in the Socket.io server stuff
const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.PORT || 3000; //.env.PORT is the environment varibale Node

app.use(express.static('public'));

// this is a route handler -> listen for incoming requests and send back a response
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// set up the server to listen for incoming connection at this port
server.listen(port, () => {
  console.log(`listening on ${port}`);
});


// socket.io ceript goes here 
io.on('connection', (socket) => {
  console.log('chat user connected');
  socket.emit('connected', { sID: socket.id, message: 'new connection' });

  socket.on('disconnect', () => {
    socket.emit('connected', { sID: socket.id, message: 'new connection' });
    console.log('chat user disconnected');
  });
  

  // step 1 - recieve incoming messages
  socket.on('chat_message', function(msg) {
    console.log(msg); //have a look at the message data

   //Step 2 - rebroadcast the current message to everyone connected to our chat service
   // it gets sent to all users, including the original message creator

   io.emit('new_message', {id: socket.id, message: msg});


  socket.on('new', function(user) {
    socket.broadcast.emit("Joiner", user + "joined the chat");
  })





   //  listen for a typing event and broadcast to all
  socket.on('typing_event', function(user) {
    console.log(user);

    socket.broadcast.emit('typing', user);
  })
   })

   

  
});

 