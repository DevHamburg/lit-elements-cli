import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("my-component")
export class MyComponent extends LitElement {
  @property()
  class = "primary";

  render() {
    return html``;
  }

  static styles = [css``];
}

declare global {
  interface HTMLElementTagNameMap {
    "my-component": MyComponent;
  }
}
