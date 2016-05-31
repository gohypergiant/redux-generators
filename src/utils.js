const Promise = require('bluebird');
const chalk = require('chalk');
const fs = require('fs');

exports.list = val => val.split(',');

exports.exists = Promise.promisify(fs.stat);

exports.read = Promise.promisify(fs.readFile);

exports.write = Promise.promisify(fs.writeFile);

exports.mkdir = Promise.promisify(fs.mkdir);

exports.exit = function exit(text) {
  if (text instanceof Error) {
    console.error(chalk.red(text.stack));
  } else {
    console.error(chalk.red(text));
  }

  return process.exit(1);
};
