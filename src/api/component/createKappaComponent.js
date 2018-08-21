import { html, render } from 'lit-html';
import createComponentDataProxyHandler from './proxyHandler';
import { proxyFunctionContext, bindFunctionsToContext, noop } from '../../util';

const defaultLifecycleHooks = {
  beforeCreated: noop,
  created: noop,
  mounted: noop,
  beforeUpdate: noop,
  updated: noop,
  destroyed: noop,
};

export default function createKappaComponent(definition, Kappa) {
  definition = Object.assign({}, defaultLifecycleHooks, definition);

  return class extends HTMLElement {
    hasMounted = false;

    static get observedAttributes() {
      return definition.props || [];
    }

    constructor() {
      super();
      if (!definition.data) {
        definition.data = function() {
          return {};
        };
      }

      this.state = new Proxy(
        definition.data(),
        createComponentDataProxyHandler(this),
      );

      this.definition = proxyFunctionContext(
        Object.assign({}, definition),
        this,
      );

      this.props = {};
      this.definition.beforeCreated();

      if (definition.methods) {
        bindFunctionsToContext(definition.methods, this);
      }

      if (Kappa.store) {
        this.registerComponentToStore(Kappa.store, Kappa);
      }

      const shadow = this.attachShadow({ mode: 'open' });
      this.container = document.createDocumentFragment();
      this._render();
      shadow.appendChild(this.container);
    }

    _render() {
      this.definition.beforeUpdate();
      let template = this.definition.template();
      if (this.definition.styles) {
        template = html`<style>${this.definition.styles}</style>${template}`;
      }

      render(template, this.container);

      if (this.hasMounted) {
        this.definition.updated();
      } else {
        this.definition.mounted();
        this.hasMounted = true;
      }
    }

    registerComponentToStore(store) {
      this.storeSubscription = store.subscribe(() => this._render());
      this.$store = store;
    }

    connectedCallback() {
      this.definition.created();
    }

    disconnectedCallback() {
      this.definition.destroyed();
      this.storeSubscription();
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
      if (oldVal !== newVal) {
        this.props[attrName] = newVal;
        this._render();
      }
    }
  };
}
