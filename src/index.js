import fetch from 'node-fetch';
import {flatten, map, prop, propOr, values} from 'ramda';

import getProjectColours from './lib/getProjectColours.js';
// import Styles from './lib/styles';
import {BASE_URL} from './lib/constants.js';

// https://www.figma.com/file/nUjPBdCSd0e4k1UzsX6slo/Badges
const BADGE_FILE_ID = 'nUjPBdCSd0e4k1UzsX6slo';
const TABLE_FILE_ID = 'F6GoMIEkk0SQ8bCTMPBfqL';
const COLOURS_FILE_ID = 'jMMeKoynZZGo7rEUqSz9JG';

const getFigma = async () => {
  // const url = `${BASE_URL}/files/${COLOURS_FILE_ID}`;
  // const opts = {
  //   headers: {
  //     'X-Figma-Token': process.env.TOKEN,
  //   },
  // };
  // let response;
  // console.log('url', url);

  // try {
  //   response = await fetch(url, opts);
  // } catch (err) {
  //   console.error(err);
  //   process.exit(1);
  // }
  const colours = await getProjectColours();

  // const {status} = response;
  // const {components, document, styles, ...data} = await response.json();
  // const componentIds = map(prop('key'), values(components));
  // const docChildren = propOr([], 'children', document);

  // console.log(document);

  // Doc children...
  // const flattened = flatten(map(propOr([], 'children'), docChildren));
  // console.log('flattened', flattened);
  // console.log('flattened', JSON.stringify(map(prop('children'), flattened), null, 2));
  // console.log('data', data);
  // console.log('components', components);
  // console.log('componentIds', componentIds);
  // console.log('status', status);

  // const allComponents = await fetch(`${url}/components`, opts);
  // const blah = await allComponents.json();
  // console.log('allComponents', allComponents);
  // console.log('cmp', JSON.stringify(blah, null, 2));

  // const test = await fetch(`${BASE_URL}/components/${componentIds[0]}`, opts);
  // const burp = await test.json();
  // console.log('test', test);
  // console.log('burp', burp);
};

getFigma();
