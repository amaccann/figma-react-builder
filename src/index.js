#!/usr/bin/env node
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';

import getProjectColours from './scripts/getProjectColours.js';

yargs(hideBin(process.argv))
  .command(
    'colors [file-id] [output]',
    'Generate colors',
    (yargs) => {
      yargs
        .positional('file-id', {
          describe: 'The file ID/Key used in Figma',
          default: false,
        })
        .positional('output', {
          describe: 'The path to the output file',
          default: './dist/colors.js',
        })
      return yargs;
    },
    getProjectColours,
  )
  .parse();