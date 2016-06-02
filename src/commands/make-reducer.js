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
    const fileName = `${lowercase(kebab(options.name))}.js`;
    const insertPath = path.join(
      paths.baseDir,
      options.parent.root,
      options.parent.path
    );
    const actionTypes = options.actions
      .map(snakeCase)
      .map(uppercase);

    utils.assert(
      utils.existsSync(insertPath),
      '"make:reducer" insert path does not exist.'
    );

    utils.info('Creating reducer...');

    utils.exists(`${insertPath}${fileName}`)
      .then(() => utils.exit(
        `Reducer file with filename "${fileName}" already exists.`
      ))
      .catch(() => utils.read(paths.reducerStub, 'utf8'))
      .then(content => Promise.resolve(
        template(content)({
          actionTypes,
          reducers: options.items,
        })
      ))
      .then(content => utils.write(`${insertPath}${fileName}`, content))
      .then(() => utils.success(
        `Reducer file successfully created! ==> "${insertPath}${fileName}"`
      ))
      .catch(utils.exit);
  });
