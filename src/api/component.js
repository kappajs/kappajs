import { html, render } from 'lit-html';
const noop = () => {};

render;

const reservedComponentApi = [
  '_render',
  'connectedCallback',
  'disconnectedCallback',
  'attributeChangedCallback',
];

const componentMap = {};

function component(name, definition) {
  if (componentMap[name]) {
    throw new Error(`The component <${name} /> is already registered`);
  }

  const reservedKeywordUsed = Object.keys(definition).find(key => reservedComponentApi.includes(key));
  if (reservedKeywordUsed) {
    throw new Error(`The component <${name} /> contains the method ${reservedKeywordUsed} which is a reserved keyword in Kappa.js`);
  }

  const webComponent = createKappaComponent(definition);
  componentMap[name] = webComponent;
  window.customElements.define(name, webComponent);
}

const defaultLifecycleHooks = {
  beforeCreated: noop,
  created: noop,
  mounted: noop,
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

function attachMethods(methods, context) {
  if (!methods) return;

  Object.keys(methods).forEach(key => {
    if (typeof methods[key] === 'function') {
      context[key] = methods[key].bind(context)
    }
  });

  return methods;
}

function createComponentDataProxyHandler(context) {
  return {
    set(obj, key, value) {
      obj[key] = value;
      context._render();
      return true;
    },
  }
}

function createKappaComponent(definition) {
  definition = Object.assign({}, defaultLifecycleHooks, definition);
  return class extends HTMLElement {

    hasMounted = false;

    static get observedAttributes() {
      return definition.props || [];
    }

    constructor() {
      super();
      if (!definition.data) definition.data = function() {return {}};
      this.state = new Proxy(definition.data(), createComponentDataProxyHandler(this))
      this.definition = proxyContext(Object.assign({}, definition), this);
      this.props = {};
      this.definition.beforeCreated();
      attachMethods(this.definition.methods, this);

      const shadow = this.attachShadow({ mode: 'open' });
      this.container = document.createDocumentFragment();
      this._render();
      shadow.appendChild(this.container);
    }

    _render() {
      this.definition.beforeUpdate();
      let template = this.definition.template();
      if (this.definition.styles) template = html`<style>${this.definition.styles}</style>${template}`
      render(template, this.container);
      if (this.hasMounted) this.definition.updated();
      else {
        this.definition.mounted();
        this.hasMounted = true;
      }
    }

    connectedCallback() {
      this.definition.created();
    }

    disconnectedCallback() {
      this.definition.detroyed();
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
      if (oldVal !== newVal) {
        this.props[attrName] = newVal;
        this._render();
      }
    }
  };
}

export function initKappaComponent(Kappa) {
  Kappa.component = component;
}
