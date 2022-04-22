import fetch from 'node-fetch';
import {flatten, map, prop, propOr, values} from 'ramda';
import {camelCase} from 'change-case';
import chalk from 'chalk';

import {BASE_URL} from './constants.js';
import { filter } from 'ramda';
import { propEq } from 'ramda';

const COLOURS_FILE_ID = 'jMMeKoynZZGo7rEUqSz9JG';

const getChildren = propOr([], 'children');
const warning = chalk.hex('#FFA500'); // Orange color

export default async () => {
  const url = `${BASE_URL}/files/${COLOURS_FILE_ID}`;
  const opts = {
    headers: {
      'X-Figma-Token': process.env.TOKEN,
    },
  };
  let response;
  console.log('url', url);

  try {
    response = await fetch(url, opts);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  const {status} = response;
  const json = await response.json();
  const {components, document, styles, ...data} = json;
  const fileName = propOr('No fileName found', 'name', data);

  console.log('styles', styles);
  console.log('fileName', fileName);
  const canvases = getChildren(document);
  const nodes = flatten(map(getChildren, canvases));
  const groups = flatten(map(getChildren, nodes));

  groups.forEach((group) => {
    const name = camelCase(group.name);
    const {name: hex} = group.children.find((child) => child.name.startsWith('#'));
    // console.log('children', group.children);
    console.log(chalk.bgHex(hex)('  '), name);
  });
  console.log(JSON.stringify(json, null, 2));
};
