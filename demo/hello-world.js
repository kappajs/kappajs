import Kappa from "../src/kappa";
import { html } from "lit-html/lib/lit-extended";

Kappa.component("hello-world", {
  template() {
    return html`
      <h1 on-click=${this.yolo}>Hello ${this.state.count} <slot>Default content</slot></h1>
      <hello-computer></hello-computer>
    `;
  },
  data() {
    return {
      count: 0
    }
  },
  beforeCreated() {
    console.log("beforeCreated");
  },
  created() {
    console.log("created");
  },
  destroyed() {
    console.log("destroyed");
  },
  methods: {
    yolo() {
      this.state.count = this.state.count + 1;
    }
  }
});