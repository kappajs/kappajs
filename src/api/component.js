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

function proxyContext(obj, context) {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'function') {
      obj[key] = obj[key].bind(context);
    }
  });

  return obj;
}

function createKappaComponent(template, definition) {
  definition = Object.assign({}, defaultLifecycleHooks, definition);
  return class extends HTMLElement {
    constructor() {
      super();
      this.definition = proxyContext(definition, this);

      console.log(this.definition);
      this.definition.created();

      const shadow = this.attachShadow({ mode: "open" });
      const container = document.createDocumentFragment();
      render(this._render(), container);
      shadow.appendChild(container);
    }

    sayHello() {
      console.log('hello');
    }

    _render() {
      return template();
    }

    connectedCallback() {
      this.definition.created();
    }

    disconnectedCallback() {
      debugger;
      this.definition.created();
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
      this.definition.created();
    }
  };
}

export function initKappaComponent(Kappa) {
  Kappa.component = component;
}
