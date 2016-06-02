const program = require('commander');
const path = require('path');
const template = require('lodash.template');
const lowercase = require('lodash.tolower');
const kebab = require('lodash.kebabcase');
const snakeCase = require('lodash.snakecase');
const uppercase = require('lodash.toupper');
const utils = require('../utils');
const paths = require('../paths');

program
  .command('make:reducer')
  .option('--items [list]', 'Add reducer items', utils.list, ['test'])
  .option('--actions [list]', 'Add action types', utils.list, ['testAction'])
  .option('--name [name]', 'Set filename for reducer file', 'reducer')
  .action(options => {
    const insertPath = path.join(options.parent.root, options.parent.path);
    const fileName = lowercase(kebab(options.name));
    const actionTypes = options.actions
      .map(snakeCase)
      .map(uppercase);

    utils.info('Creating reducer...');
    utils.exists(`${fileName}.js`)
      .then(() => utils.exit(
        `Reducer file with filename "${fileName}.js" already exists.`
      ))
      .catch(() => utils.read(paths.reducerStub, 'utf8'))
      .then(content => Promise.resolve(
        template(content)({
          actionTypes,
          reducers: options.items,
        })
      ))
      .then(content => utils.write(`${insertPath}${fileName}.js`, content))
      .then(() => utils.success(
        `Reducer file successfully created! ==> "${insertPath}${fileName}.js"`
      ))
      .catch(utils.exit);
  });
