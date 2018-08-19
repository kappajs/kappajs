import Kappa from '../kappa';
import { html } from 'lit-html/lib/lit-extended';

export const Link = Kappa.component('ez-link', {
  template() {
    return html`
      <a on-click=${this.changeRoute}>
        <slot></slot>
      </a>
    `
  },
  props: ['to', 'state'],
  methods: {
    changeRoute() {
      history.pushState(this.props.state, '', this.props.to);
    }
  }
})

export default Link;