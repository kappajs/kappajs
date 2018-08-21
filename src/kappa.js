import initKappaComponent from './api/component';

export default class Kappa {
  constructor(options) {
    let el;

    if (options.el instanceof HTMLElement) {
      el = options.el;
    } else {
      el = document.querySelector(el);
    }

    if (!el) {
      throw new Error('Kappa.js requires an element to mount to');
    }

    this.el = el;
    this.component = options.root;
    Kappa.store = this.store = options.store;

    this.start();
  }

  start() {
    for (const name of Object.keys(Kappa.components)) {
      window.customElements.define(name, Kappa.components[name].component);
    }
  }
}

initKappaComponent(Kappa);
