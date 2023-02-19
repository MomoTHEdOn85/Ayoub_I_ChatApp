//import at the top
import ChatMsg from './components/chatMessage.js';
 
var socket = io();


// utility functions for socket
function setUserID({ sID }) {
  //save our unique ID generated by socket on the server side - this 
  vm.socketID = sID;
}

function addNewMessage(message) {
  vm.messages.push(message);

}

function handleTypingEvent(user) {
  //const messageContainer = document.getElementById('message-container');
  //const message = 'is typing...';

   
  console.log(user, 'typing..');
  //vm.userTyping = `${data.user} is typing...`;

  //messageContainer = (user, 'typing');

  //document.querySelector('.alert').getElementsByClassName.display = "block";

}

function createUsers() {
  socket.on('user joined', function (socketId){
    this.connectedUsers.push(socketId);
} .bind(this));

}

 

const { createApp } = Vue

const vm = createApp({
  data() {
    return {
      socketID:'',
      message: '',
      messages: [],
      username: '',
      userTyping: '',
      state: 0
    }
  }, 

  methods: {
    dispatchMessage() {
      console.log('send a message to the chat service');

      socket.emit('chat_message', {
        content: this.message, 
        user: this.username || 'anonymous',
        id:this.socketID
      });

      this.message = '';

    },

    dispatchTypingEvent() {
      // send the typing notification to the server
      console.log('show who is typing')
      socket.emit('typing_event', { user: this.nickname || 'anonymous' })
    },

   // hideAlerts() {
      //document.querySelector('.alert').style.display = "block";

  //  },

    dispatchJoined() {
      console.log('Someone has joined');
      socket.emit('join', this.username);
      this.username = '';
      this.state = 1;
    }

  },

  components: {
    newmsg: ChatMsg

  }
}).mount('#app')

socket.addEventListener('new_message', addNewMessage);
socket.addEventListener('connected', setUserID);
socket.addEventListener('typing', handleTypingEvent);
//socket.addEventListener('User', dispatchJoined)


