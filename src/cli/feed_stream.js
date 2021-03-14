#!/usr/bin/env node

/* eslint-disable no-restricted-syntax,no-await-in-loop */
const fs = require('fs');
const path = require('path');
const program = require('commander');
const _ = require('lodash');
const process = require('process');
const { v2: getDeviceInformations } = require('../');
const { promisify, inspect } = require('util');
const split = require('split');
const readFile = promisify(fs.readFile);

const prettyDump = data => console.info(inspect(data, { colors: true }));

program
  .version('0.1.0')
  .description('Put lines one by one with a delay to stdout')
  .option('-f, --file <file>', 'input file')
  .option('-d, --delay <delay>', 'delay between lines')
  .parse(process.argv);

const { delay, file } = program.opts();
if (!file) {
  program.help();
  process.exit(1);
}

(async function () {
  const data = await readFile(file);
  const lines = data.toString().split(/\r?\n/);
  for (const line of lines) {
    await new Promise(resolve => setTimeout(resolve, delay || 1000 * Math.random()));
    console.log(line);
  }
})();
