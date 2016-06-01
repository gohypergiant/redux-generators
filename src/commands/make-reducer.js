const program = require('commander');
const path = require('path');
const template = require('lodash.template');
const utils = require('../utils');
const paths = require('../paths');

program
  .command('make:reducer')
  .option('--items [list]', 'Add reducer items', utils.list, ['test'])
  .action(options => {
    const insertPath = path.join(
      paths.baseDir,
      options.parent.root,
      options.parent.path
    );

    utils.assert(
      utils.existsSync(insertPath),
      '"make:reducer" insert path does not exist.'
    );

    utils.info('Creating reducer...');

    utils.exists('reducer.js')
      .then(() => utils.exit('A reducer in this directory already exists.'))
      .catch(() => utils.read(paths.reducerStub, 'utf8'))
      .then(content => Promise.resolve(
        template(content)({
          reducers: options.items,
        })
      ))
      .then(content => utils.write(`${insertPath}reducer.js`, content))
      .then(() => utils.success('Reducer successfully created!'))
      .catch(utils.exit);
  });
