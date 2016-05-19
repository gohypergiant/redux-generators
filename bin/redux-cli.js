#!/usr/bin/env node

const Promise = require('bluebird');
const program = require('commander');
const chalk = require('chalk');
const template = require('lodash.template');
const snakeCase = require('lodash.snakecase');
const uppercase = require('lodash.toupper');
const lowercase = require('lodash.tolower');
const kebab = require('lodash.kebabcase');
const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');
const ver = pkg.version;

const exists = Promise.promisify(fs.stat);
const read = Promise.promisify(fs.readFile);
const write = Promise.promisify(fs.writeFile);
const mkdir = Promise.promisify(fs.mkdir);

const templatesDir = path.join(__dirname, '../', 'templates');
const reducerStub = path.join(templatesDir, 'reducer.stub');
const actionStub = path.join(templatesDir, 'actions.stub');
const selectorStub = path.join(templatesDir, 'selectors.stub');
const containerStub = path.join(templatesDir, 'container.stub');

function exit(text) {
  if (text instanceof Error) {
    console.error(chalk.red(text.stack));
  } else {
    console.error(chalk.red(text));
  }

  return process.exit(1);
}

function list(val) {
  return val.split(',');
}

program
  .version(ver)
  .option('-r, --root [path]', 'The root path of your redux application', process.cwd())
  .option('-p, --path [path]', 'The path you want to save the files to', './');

program
  .command('make <name>')
  .option('--reducers [list]', 'Add reducer items', list, ['test'])
  .option('--actions [list]', 'Add action items', list, ['testAction'])
  .option('--selectors [list]', 'Add selector items', list, ['testSelector'])
  .action((name, options) => {
    const insertPath = path.join(options.parent.root, options.parent.path);

    console.log(chalk.cyan(`Creating state "${name}"...`));
    exists(name)
      .then(() => exit(`State "${name}" already exists.`))
      .catch(() => mkdir(`${insertPath}${name}`))
      .then(() => Promise.all([
        read(reducerStub, 'utf8'),
        read(actionStub, 'utf8'),
        read(selectorStub, 'utf8'),
      ]))
      .then(res => Promise.all([
        Promise.resolve(template(res[0])({ reducers: options.reducers })),
        Promise.resolve(template(res[1])({
          actions: options.actions,
          types: options.actions
            .map(action => `${name}_${action}`)
            .map(snakeCase)
            .map(uppercase),
        })),
        Promise.resolve(template(res[2])({ selectors: options.selectors })),
      ]))
      .then(res => Promise.all([
        write(`${insertPath}${name}/reducer.js`, res[0]),
        write(`${insertPath}${name}/actions.js`, res[1]),
        write(`${insertPath}${name}/selectors.js`, res[2]),
      ]))
      .then(() => console.log(chalk.green(`State "${name}" successfully created!`)))
      .catch(exit);
  });

program
  .command('make:reducer')
  .option('--items [list]', 'Add reducer items', list, ['test'])
  .action(options => {
    const insertPath = path.join(options.parent.root, options.parent.path);

    console.log(chalk.cyan('Creating reducer...'));
    exists('reducer.js')
      .then(() => exit('A reducer in this directory already exists.'))
      .catch(() => read(reducerStub, 'utf8'))
      .then(content => Promise.resolve(
        template(content)({ reducers: options.items })
      ))
      .then(content => write(`${insertPath}reducer.js`, content))
      .then(() => console.log(chalk.green('Reducer successfully created!')))
      .catch(exit);
  });

program
  .command('make:action')
  .option('--items [list]', 'Add action items', list, ['testAction'])
  .action(options => {
    const insertPath = path.join(options.parent.root, options.parent.path);

    console.log(chalk.cyan('Creating action...'));
    exists('actions.js')
      .then(() => exit('A action in this directory already exists.'))
      .catch(() => read(actionStub, 'utf8'))
      .then(content => Promise.resolve(
        template(content)({
          actions: options.items,
          types: options.items
            .map(snakeCase)
            .map(uppercase),
        })
      ))
      .then(content => write(`${insertPath}actions.js`, content))
      .then(() => console.log(chalk.green('Action successfully created!')))
      .catch(exit);
  });

program
  .command('make:selector')
  .option('--items [list]', 'Add selector items', list, ['testSelector'])
  .action(options => {
    const insertPath = path.join(options.parent.root, options.parent.path);

    console.log(chalk.cyan('Creating selector...'));
    exists('selectors.js')
      .then(() => exit('A selector in this directory already exists.'))
      .catch(() => read(selectorStub, 'utf8'))
      .then(content => Promise.resolve(
        template(content)({ selectors: options.items })
      ))
      .then(content => write(`${insertPath}selectors.js`, content))
      .then(() => console.log(chalk.green('Selector successfully created!')))
      .catch(exit);
  });

program
  .command('make:container <name>')
  .option('--selector [name]', 'Selector for container component', 'testSelector')
  .action((name, options) => {
    const insertPath = path.join(options.parent.root, options.parent.path);
    const fileName = `${lowercase(kebab(name))}.js`;

    console.log(chalk.cyan(`Creating container component "${name}" inside "${fileName}"...`));
    exists(fileName)
      .then(() => exit(`Container component "${name}" already exists.`))
      .catch(() => read(containerStub, 'utf8'))
      .then(content => Promise.resolve(
        template(content)({
          name,
          selector: options.selector,
        })
      ))
      .then(content => write(`${insertPath}/${fileName}`, content))
      .then(() => console.log(chalk.green(
        `Container component ${name} successfully created inside "${fileName}"!`
      )))
      .catch(exit);
  });

program.parse(process.argv);
