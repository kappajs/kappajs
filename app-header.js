import { render, html } from 'lit-html'

class AppHeader extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open'});
    const container = document.createDocumentFragment();
    
    render(this._render(), container);
    shadow.appendChild(container);

  }

  _render() {
    return html`
      <header>App Header</header>
    `;
  }

  connectedCallback() {
    
  }

  disconnectedCallback() {
    
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
  
  }


}

customElements.define('app-header', AppHeader);