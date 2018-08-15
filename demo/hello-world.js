import Kappa from "../src/kappa";
import { html } from "lit-html/lib/lit-extended";

Kappa.component("hello-world", {
  template() {
    return html`
      <h1 on-click=${() => this.setState({name: 'clicked'})}>Hello ${this.state.name}</h1>
    `;
  },
  beforeCreated() {
    console.log("beforeCreated");
  },
  created() {
    console.log("created");
    this.setState({
      name: 'Kappa'
    });
  },
  destroyed() {
    console.log("destroyed");
  }
});
