import {flatten, map, propOr} from 'ramda';
import {camelCase} from 'change-case';
import chalk from 'chalk';

import {BASE_URL} from '../constants.js';
import colorsTemplate from '../templates/colors.js';

import fetch from '../utilites/fetch.js';
import writeToFile from '../utilites/writeToFile.js';

// const COLOURS_FILE_ID = 'jMMeKoynZZGo7rEUqSz9JG';

const getChildren = propOr([], 'children');

export default async ({fileId, output}) => {
  const url = `${BASE_URL}/files/${fileId}`;
  const response = await fetch(url);

  const {status} = response;
  if (status !== 200) {
    return console.log(chalk.bgRed(`Could not load "${fileId}"; status was [${status}]`));
  }

  const json = await response.json();
  const {components, document, styles, ...data} = json;
  const fileName = propOr('No fileName found', 'name', data);

  const canvases = getChildren(document);
  const nodes = flatten(map(getChildren, canvases));
  const groups = flatten(map(getChildren, nodes));

  let template = [];
  console.group(`🎨 Colors discovered in file "${fileName}"`);
  groups.forEach((group) => {
    const name = camelCase(group.name);
    const children = group?.children || [];
    const {name: hex} = children.find((child) => child.name.startsWith('#'));
    console.log(chalk.bgHex(hex)('  '), chalk.hex(hex)(name));
    template.push(`export const ${name} = '${hex}';`);
  });
  console.groupEnd(`🎨 Colors discovered in file "${fileName}"`);

  if (!template.length) {
    console.log(chalk.bgRed('No colors discovered in file; aborting file write'));
  }

  const fileContent = colorsTemplate(template.join('\n'));
  writeToFile(output, fileContent);
};
