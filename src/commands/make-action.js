const program = require('commander');
const path = require('path');
const template = require('lodash.template');
const snakeCase = require('lodash.snakecase');
const lowercase = require('lodash.tolower');
const kebab = require('lodash.kebabcase');
const uppercase = require('lodash.toupper');
const utils = require('../utils');
const paths = require('../paths');

program
  .command('make:action')
  .option('--items [list]', 'Add action items', utils.list, ['testAction'])
  .option('--name [name]', 'Set filename for actions file', 'actions')
  .action(options => {
    const fileName = lowercase(kebab(options.name));
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

    utils.exists(`${insertPath}${fileName}.js`)
      .then(() => utils.exit(
        `Actions file with filename "${fileName}.js" already exists.`
      ))
      .catch(() => utils.read(paths.actionStub, 'utf8'))
      .then(content => Promise.resolve(
        template(content)({
          actions: options.items,
          types: options.items
            .map(snakeCase)
            .map(uppercase),
        })
      ))
      .then(content => utils.write(`${insertPath}${fileName}.js`, content))
      .then(() => utils.success(
        `Actions file successfully created! ==> "${insertPath}${fileName}.js"`
      ))
      .catch(utils.exit);
  });
