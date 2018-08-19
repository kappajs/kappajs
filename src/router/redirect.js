import Kappa from '../kappa';
import { subscribeToHistoryChange } from './utils';
import { html } from 'lit-html/lib/lit-extended';

export const Link = Kappa.component('ez-redirect', {
  template() {
    return html`
      <a on-click=${this.changeRoute}>
        <slot></slot>
      </a>
    `
  },
  props: ['to'],
  created () {
    subscribeToHistoryChange(data => {
      this.redirect();
    });
  },
  updated () {
    this.redirect();
  },
  methods: {
    redirect() {
      history.replaceState(history.state, '', this.props.to)
    }
  }
})

export default Link;