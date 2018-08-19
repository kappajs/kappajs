import Kappa from '../kappa';
import { subscribeToHistoryChange } from './utils';
import { html } from 'lit-html/lib/lit-extended';

export const Route = Kappa.component('ez-route', {
  template() {
    return html`
      ${this.test()}
    `
  },
  // TODO: exact
  props: ['path', 'component'],
  created() {
    subscribeToHistoryChange(() => {
      this._render();
    });
  },
  methods: {
    test() {
      console.log(location.pathname, this.props.path, location.pathname === this.props.path);
      if (location.pathname === this.props.path) {
        if (this.props.component) {
          return document.createElement(this.props.component);
        }
        return html`<slot></slot>`
      }
    }
  }
})

export default Route;