import { render, html } from "./node_modules/lit-html";

let componentMap = {};

export default class Kappa {
  constructor(el) {
    this.el = el;
    console.log("Kappa bootstrapped");
  }
}

Kappa.component = function component(name, template, definition) {
  if (componentMap[name])
    throw new Error(`The component ${name} is already registered`);

  const webComponent = createKappaComponent(template, definition);
  componentMap[name] = webComponent;
  window.customElements.define(name, webComponent);
};

export function createKappaComponent(template, definition) {
  return class extends HTMLElement {
    constructor() {
      super();

      this.definition = definition;
      const shadow = this.attachShadow({ mode: "open" });
      const container = document.createDocumentFragment();
      render(this._render(), container);
      shadow.appendChild(container);
    }

    _render() {
      return template();
    }

    connectedCallback() {
      definition.created();
    }

    disconnectedCallback() {}

    attributeChangedCallback(attrName, oldVal, newVal) {
      definition.updated();
    }
  };
}
