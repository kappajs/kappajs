import Kappa from '../kappa';
import { html } from 'lit-html/lib/lit-extended';

const component = Kappa.component('kappa-route', {
  template() {
    return html`
      ${this.test()}
    `
  },
  created() {
    console.log(this.props.component);
  },
  props: ['path', 'component'],
  methods: {
    test() {
      if (location.pathname === this.props.path) {
        return document.createElement(this.props.component);
      }
    }
  }
})

export default component;