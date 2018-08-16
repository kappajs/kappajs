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
  mounted() {
    console.log('mounted')
  },
  props: ['path', 'component'],
  methods: {
    test() {
      if (location.pathname === this.props.path) {
        if (this.props.component) {
          return document.createElement(this.props.component);
        }
        return html`<slot></slot>`
      }
    }
  }
})

export default component;