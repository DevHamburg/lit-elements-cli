#!/usr/bin/env node

import arg from "arg";
import fs from "fs";
import chalk from "chalk";
import Listr from "listr";

process.argv.slice(2);

init();

async function init() {
  let options = await parseArguments();
  generateComponent(options);
}

function parseArguments() {
  const args = arg({
    "--component": String,
    "-c": "--component",
    "--path": String,
    "-p": "--path",
  });
  if (!args["--component"] || !args["--path"]) {
    console.error(
      chalk.red.bold(
        "ERROR: missing one of the required argument: --component (alias: -c), --path (alias: -p)"
      )
    );
  }
  return {
    component: args["--component"] || false,
    path: args["--path"] || false,
  };
}

async function createComponentFolder(targetDirectory) {
  console.log(targetDirectory);
  if (!fs.existsSync(targetDirectory)) {
    fs.mkdirSync(targetDirectory, { recursive: true });
    return;
  }
  console.error(
    chalk.red.bold("Abort: Folder already exists in the specified path")
  );
  process.exit(1);
}

function convertNameToCamleCase(string) {
  const splitString = string.toLowerCase().split("-");
  for (let i = 0; i < splitString.length; i++) {
    splitString[i] =
      splitString[i].charAt(0).toUpperCase() + splitString[i].substring(1);
  }
  return splitString.join("");
}

async function generateFiles(targetDirectory, componentName) {
  fs.writeFile(
    targetDirectory + "/" + componentName + ".ts",
    `
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("${componentName}")
export class ${convertNameToCamleCase(componentName)} extends LitElement {
  @property()
  class = "primary";

  render() {
    return ${"html ``"};
  }

  static styles = [
    ${"css ``"}
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "${componentName}": ${convertNameToCamleCase(componentName)};
  }
}
    `,
    (err) => {
      if (err) console.error(error);
    }
  );
}

async function generateComponent(options) {
  if (options.componentName === false || options.path === false)
    process.exit(1);
  const targetDirectory = "src/" + options.path;
  const componentName = options.component;

  const tasks = new Listr([
    {
      title: "Lit Elements CLI",
      task: () => {
        console.log(
          "\n",
          "##      ##  ######      ######  ##      ##",
          "\n",
          "##      ##    ##        ##      ##      ##",
          "\n",
          "##      ##    ##   ##   ##      ##      ##",
          "\n",
          "######  ##    ##        ######  ######  ##",
          "\n"
        );
      },
    },
    {
      title: "Creating component directory",
      task: () => createComponentFolder(targetDirectory + "/" + componentName),
    },
    {
      title: "Creating lit component template",
      task: () =>
        generateFiles(targetDirectory + "/" + componentName, componentName),
    },
  ]);

  await tasks.run();
}
