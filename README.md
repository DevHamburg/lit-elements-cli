# Lit Elements Cli

Cli to create lit element template component.

## Installing Lit Elements Cli

```
npm install -TODO
```

## Basic Workflow

**cd into root of your lit elements project and run:**

```
litel --component <component-name> --path <path-of-directory>
```

**Alias**

```
litel -c <component-name> -p <path-of-directory>
```

**Example**

```
litel -c my-component -p components
```

**Console Output**

```
##      ##  ######      ######  ##      ##
##      ##    ##        ##      ##      ##
##      ##    ##   ##   ##      ##      ##
######  ##    ##        ######  ######  ##
```

`✔ Lit Elements CLI`

`✔ Creating component directory`

`✔ Creating lit component template`

**Template Output**

```
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

```

**Directory Output**

**Info:** if this directory dont exsists, the cli will create it.

`src/components/my-component/my-component.ts`

## Input Examples

```
litel -c my-new-component -p components/new/new-component
```

```
litel --component my-component -p components/new
```

```
litel --component my-component --path components
```

```
litel -c my-component --path components
```
