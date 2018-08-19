import Kappa from '../src/kappa';
import { html } from 'lit-html/lib/lit-extended';
import NewRoute from './new-route';

Kappa.component('hello-world', {
  template() {
    return html`
      <h1>Hello ${this.state.count}</h1>
      <my-button on-click=${this.yolo} count$=${this.state.count}>
        Increment
      </my-button>
      
      <br>

      <ez-link to="/test">Route 1</ez-link>

      <br> 

      <ez-link to="/test2">Route 2</ez-link>

      <br>
      
      <ez-link to="/redirect">Redirect Link</ez-link>

      <ez-route path="/test" component="new-route">
      </ez-route>

      <ez-route path="/test2">
        <h2>Route 2</h2>
      </ez-route>

      <ez-route path="/redirect">
        <ez-redirect to="/test2"></ez-redirect>
      </ez-route>
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