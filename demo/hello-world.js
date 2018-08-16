import Kappa from '../src/kappa';
import { html } from 'lit-html/lib/lit-extended';
import '../src/router/route.js';
import NewRoute from './new-route';

Kappa.component('hello-world', {
  template() {
    return html`
      <h1>Hello ${this.state.count}</h1>
      <my-button on-click=${this.yolo} count$=${this.state.count}>
        Increment
      </my-button>

      <kappa-route path="/test" component="new-route"}></kappa-route>
    `;
  },
  data() {
    return {
      count: 0
    }
  },
  beforeCreated() {
    console.log('beforeCreated');
  },
  created() {
    console.log('created');
  },
  destroyed() {
    console.log('destroyed');
  },
  methods: {
    yolo() {
      this.state.count = this.state.count + 1;
    }
  }
});