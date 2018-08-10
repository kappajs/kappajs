import { component } from './kappa';
import { html } from 'lit-html';

const template = () => {
  html`
    <h1>Hello World</h1>
  `
}

component('hello-world', template, {
  created() {
    console.log('created');
  }
})