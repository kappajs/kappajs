import Kappa from '../src/kappa';
import { html } from 'lit-html/lib/lit-extended';

Kappa.component('my-button', {
  template() {
    return html`
      <button>
        <strong><slot></slot>${this.props.count}</strong>
      </button>
    `;
  },
  props: ['count'],
  updated() {
    console.log('updated');
  },
  styles: `
    button {
      color: blue;
      background: white;
      padding: .5em;
      border-radius: .2em;
      border: 1px solid blue;
      cursor: pointer;
    }

    button:focus {
      outline: none;
    }

    button:active {
      background: lightblue;
    }
  `
});