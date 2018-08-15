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
  data() {
    return {
      count: 0
    }
  },
  beforeCreated() {
    console.log('beforeCreated');
  },
  created() {
    console.log('created');
  },
  destroyed() {
    console.log('destroyed');
  },
  methods: {
    yolo() {
      this.state.count = this.state.count + 1;
    }
  }
});