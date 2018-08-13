import { render } from "lit-html";
const noop = () => {};

render;

const componentMap = {};

function component(name, template, definition) {
  if (componentMap[name])
    throw new Error(`The component <${name} /> is already registered`);

  const webComponent = createKappaComponent(template, definition);
  componentMap[name] = webComponent;
  window.customElements.define(name, webComponent);
}

const defaultLifecycleHooks = {
  beforeCreated: noop,
  created: noop,
  updated: noop,
  destroyed: noop
};

function createKappaComponent(template, definition) {
  definition = Object.assign({}, defaultLifecycleHooks, definition);
  return class extends HTMLElement {
    constructor() {
      super();
      this.definition = definition;

      definition.beforeCreated();

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

    disconnectedCallback() {
      debugger;
      definition.destroyed();
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
      definition.updated();
    }
  };
}

export function initKappaComponent(Kappa) {
  Kappa.component = component;
}
