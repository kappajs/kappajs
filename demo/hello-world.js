import Kappa from '../src/kappa';
import { html } from 'lit-html/lib/lit-extended';

Kappa.component('hello-world', {
  template() {
    return html`
      <h1>Hello ${this.state.count}</h1>
      <my-button on-click=${this.yolo}>
        Increment
      </my-button>
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