import Kappa from "../src/kappa";
import { html } from "lit-html";

const template = () => {
  return html`
    <h1>Hello World</h1>
  `;
};

Kappa.component("hello-world", template, {
  beforeCreated() {
    console.log("beforeCreated");
  },
  created() {
    console.log("created");
  },
  destroyed() {
    console.log("destroyed");
  }
});
