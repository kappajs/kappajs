import Kappa from '../src/kappa';
import { html } from 'lit-html/lib/lit-extended';

Kappa.component('my-button', {
  template() {
    return html`
      <button slot="content">
        <slot id="content"></slot>
      </button>
    `;
  },
});