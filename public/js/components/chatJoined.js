export default {
  name: 'TheChatJoinedComponent',

  props: ['message'],

   
   

  data() {
    return{
     // message: 'hello from the template'
      //check to see of the message's ID is the same as ours
      //if it IS, float to the right
      // else float to the left
      matchedID: this.$parent.socketID == this.message.id
    }
  },

  template: `
  <article class="chat-messages" :class="{ 'other-messages' :matchedID }">
      <h1>{{ message.message.user }}</h1>
      <p>{{ message.message.content }}</p>
  </article>
  `


  
  
}