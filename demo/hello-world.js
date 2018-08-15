import Kappa from "../src/kappa";
import { html } from "lit-html/lib/lit-extended";

const template = (self) => {
  return html`
    <h1 on-click=${() => self.setState({name: 'clicked'})}>Hello ${self.state.name}</h1>
  `;
};

Kappa.component("hello-world", template, {
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
