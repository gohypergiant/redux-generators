const program = require('commander');
const path = require('path');
const template = require('lodash.template');
const lowercase = require('lodash.tolower');
const kebab = require('lodash.kebabcase');
const utils = require('../utils');
const paths = require('../paths');

program
  .command('make:selector')
  .option('--items [list]', 'Add selector items', utils.list, ['testSelector'])
  .option('--name [name]', 'Set filename for selectors file', 'selectors')
  .action(options => {
    const insertPath = path.join(options.parent.root, options.parent.path);
    const fileName = lowercase(kebab(options.name));

    utils.info('Creating selector...');
    utils.exists(`${fileName}.js`)
      .then(() => utils.exit(
        `Selectors file with filename "${fileName}.js" already exists.`
      ))
      .catch(() => utils.read(paths.selectorStub, 'utf8'))
      .then(content => Promise.resolve(
        template(content)({
          selectors: options.items,
        })
      ))
      .then(content => utils.write(`${insertPath}${fileName}.js`, content))
      .then(() => utils.success(
        `Selectors file successfully created! ==> "${insertPath}${fileName}.js"`
      ))
      .catch(utils.exit);
  });
