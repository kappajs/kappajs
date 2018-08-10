let componentMap = {};

export default class Kappa {
  
  constructor(el) {
    this.el = el;
    console.log('Kappa bootstrapped');
  }
}

export function component(name, template, definition) {
  if (componentMap[name]) throw new Error(`The component ${name} is already registered`);
  const component = new KappaComponent(definition, template);
  window.customElements.define(name, component);
  return component;
}

export class KappaComponent extends HTMLElement {
  constructor(definition, template) {
    super();
    this.definition = definition;
    const shadow = this.attachShadow({ mode: 'open'});
    shadow.innerHTML = template;
  }

  connectedCallback() {
    definition.created();
  }

  disconnectedCallback() {
    
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    definition.updated();
  }
}