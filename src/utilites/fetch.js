import fetch from 'node-fetch';
import {flatten, map, propOr} from 'ramda';
import {camelCase} from 'change-case';
import chalk from 'chalk';

export default async (url) => {
  const opts = {
    headers: {
      'X-Figma-Token': process.env.TOKEN,
    },
  };
  let response;

  try {
    response = await fetch(url, opts);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  return response;
};
