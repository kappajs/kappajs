import Kappa from '../src/kappa';
import { html } from 'lit-html/lib/lit-extended';

export default Kappa.component('new-route', {
  template() {
    return html`
      <h2>New Route</h2>
    `;
  },
});
