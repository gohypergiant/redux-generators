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
    const insertPath = path.join(
      paths.baseDir,
      options.parent.root,
      options.parent.path
    );

    utils.assert(
      utils.existsSync(insertPath),
      '"make:action" insert path does not exist.'
    );

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
