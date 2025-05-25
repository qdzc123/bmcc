class TabPanel extends HTMLElement {
  constructor() {
    super();
    const tpl = document.createElement('template');
    tpl.innerHTML = \`
      <style>
        ::slotted([slot]) { display: none; }
        ::slotted([slot="panel active"]) { display: block; }
      </style>
      <nav><slot name="tab"></slot></nav>
      <div><slot name="panel"></slot></div>
    \`;
    this.attachShadow({ mode: 'open' }).appendChild(tpl.content.cloneNode(true));
  }
}
customElements.define('tab-panel', TabPanel);