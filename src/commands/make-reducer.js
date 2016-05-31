const program = require('commander');
const path = require('path');
const chalk = require('chalk');
const template = require('lodash.template');
const utils = require('../utils');
const paths = require('../paths');

program
  .command('make:reducer')
  .option('--items [list]', 'Add reducer items', utils.list, ['test'])
  .action(options => {
    const insertPath = path.join(options.parent.root, options.parent.path);

    console.log(chalk.cyan('Creating reducer...'));
    utils.exists('reducer.js')
      .then(() => utils.exit('A reducer in this directory already exists.'))
      .catch(() => utils.read(paths.reducerStub, 'utf8'))
      .then(content => Promise.resolve(
        template(content)({ reducers: options.items })
      ))
      .then(content => utils.write(`${insertPath}reducer.js`, content))
      .then(() => console.log(chalk.green('Reducer successfully created!')))
      .catch(utils.exit);
  });
