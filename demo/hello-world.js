import Kappa from '../src/kappa';
import { html } from 'lit-html/lib/lit-extended';
import '../src/router/route.js';
import NewRoute from './new-route';

export default Kappa.component('hello-world', {
  template() {
    return html`
      <h1>Hello ${this.$store.state.count}</h1>
      <my-button on-click=${this.yolo} count$=${this.$store.state.count}>
        Increment
      </my-button>

      <kappa-route path="/test" component="new-route">
      </kappa-route>

      <kappa-route path="/test/blue">
        <h2>Bruh</h2>
      </kappa-route>
    `;
  },
  data() {
    return {};
  },
  beforeCreated() {
    console.log('beforeCreated');
  },
  created() {
    console.log('created');
  },
  updated() {
    console.log(this.$store);
  },
  destroyed() {
    console.log('destroyed');
  },
  methods: {
    yolo() {
      this.$store.dispatch('INCREMENT_COUNT');
    },
  },
});
