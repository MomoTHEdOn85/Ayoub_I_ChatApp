export default {
  name: 'TheTyperComponent',

  props: ['name'],

  data() {
    return {

    }
  },

  template: `
  <div class="typing_event">
      <p>{{name.user}} typing</p>
  </div>
  `
}