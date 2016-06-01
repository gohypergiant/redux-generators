const program = require('commander');
const path = require('path');
const template = require('lodash.template');
const utils = require('../utils');
const paths = require('../paths');

program
  .command('make:selector')
  .option('--items [list]', 'Add selector items', utils.list, ['testSelector'])
  .action(options => {
    const insertPath = path.join(
      paths.baseDir,
      options.parent.root,
      options.parent.path
    );

    utils.assert(
      utils.existsSync(insertPath),
      '"make:selector" insert path does not exist.'
    );

    utils.info('Creating selector...');

    utils.exists('selectors.js')
      .then(() => utils.exit('A selector in this directory already exists.'))
      .catch(() => utils.read(paths.selectorStub, 'utf8'))
      .then(content => Promise.resolve(
        template(content)({
          selectors: options.items,
        })
      ))
      .then(content => utils.write(`${insertPath}selectors.js`, content))
      .then(() => utils.success('Selector successfully created!'))
      .catch(utils.exit);
  });
