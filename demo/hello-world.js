import Kappa from "../src/kappa";
import { html } from "lit-html/lib/lit-extended";

Kappa.component("hello-world", {
  template() {
    return html`
      <h1 on-click=${this.yolo}>Hello ${this.state.count}</h1>
    `;
  },
  beforeCreated() {
    console.log("beforeCreated");
  },
  created() {
    console.log("created");
    this.setState({
      name: 'Kappa',
      count: 0
    });
  },
  destroyed() {
    console.log("destroyed");
  },
  methods: {
    yolo() {
      console.log(this.state.count);
      this.setState({
        count: this.state.count + 1
      })
    }
  }
});
