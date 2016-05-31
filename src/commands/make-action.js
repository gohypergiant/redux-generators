const program = require('commander');
const path = require('path');
const template = require('lodash.template');
const snakeCase = require('lodash.snakecase');
const uppercase = require('lodash.toupper');
const utils = require('../utils');
const paths = require('../paths');

program
  .command('make:action')
  .option('--items [list]', 'Add action items', utils.list, ['testAction'])
  .action(options => {
    const insertPath = path.join(options.parent.root, options.parent.path);

    utils.info('Creating action...');
    utils.exists('actions.js')
      .then(() => utils.exit('A action in this directory already exists.'))
      .catch(() => utils.read(paths.actionStub, 'utf8'))
      .then(content => Promise.resolve(
        template(content)({
          actions: options.items,
          types: options.items
            .map(snakeCase)
            .map(uppercase),
        })
      ))
      .then(content => utils.write(`${insertPath}actions.js`, content))
      .then(() => utils.success('Action successfully created!'))
      .catch(utils.exit);
  });
