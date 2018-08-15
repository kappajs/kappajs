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
  beforeUpdate: noop,
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

    state = {}

    constructor() {
      super();
      this.definition = proxyContext(definition, this);
      this.definition.beforeCreated();

      const shadow = this.attachShadow({ mode: "open" });
      this.container = document.createDocumentFragment();
      this._render();
      shadow.appendChild(this.container);
    }

    setState(newState) {
      this.state = newState;
      this._render();
    }

    _render() {
      this.definition.beforeUpdate();
      return render(template(this), this.container);
      this.definition.updated();
    }

    connectedCallback() {
      this.definition.created();
    }

    disconnectedCallback() {
      this.definition.detroyed();
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
      this._render();
    }
  };
}

export function initKappaComponent(Kappa) {
  Kappa.component = component;
}
