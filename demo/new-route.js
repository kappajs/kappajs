import Kappa from '../src/kappa';
import { html } from 'lit-html/lib/lit-extended';

const component = Kappa.component('new-route', {
  template() {
    return html`
      <h2>Route 1</h2>
    `;
  },
});

export default component;