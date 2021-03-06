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
  .description('Parse the stream or file into the device information logs')
  .option('-f, --file <file>', 'input file')
  .parse(process.argv);

const { stream, file } = program.opts();

(async function () {
  if (file) {
    const data = await readFile(file);
    const result = getDeviceInformations(data.toString());
    prettyDump(result);
    process.exit(0);
  }
  console.info('Stream mode enabled, waiting for data on standard input');
  process.stdin
    .on('data', function (data) {
      const result = getDeviceInformations(data.toString());
      prettyDump(result);
    })
    .on('error', function (err) {
      console.error(`Error during pipe: ${error.message}`);
    });
})();
