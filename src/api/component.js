import { render } from "lit-html";

render;

const componentMap = {};

function component(name, template, definition) {
  if (componentMap[name])
    throw new Error(`The component ${name} is already registered`);

  const webComponent = createKappaComponent(template, definition);
  componentMap[name] = webComponent;
  window.customElements.define(name, webComponent);
}

function createKappaComponent(template, definition) {
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

export function initKappaComponent(Kappa) {
  Kappa.component = component;
}
