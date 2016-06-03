const program = require('commander');
const path = require('path');
const template = require('lodash.template');
const snakeCase = require('lodash.snakecase');
const uppercase = require('lodash.toupper');
const kebab = require('lodash.kebabcase');
const lowercase = require('lodash.tolower');
const utils = require('../utils');
const paths = require('../paths');

program
  .command('make <name>')
  .option('--reducers <list>', 'Add reducer items', utils.list, ['test'])
  .option('--actions <list>', 'Add action items', utils.list, ['testAction'])
  .option('--selectors <list>', 'Add selector items', utils.list, ['testSelector'])
  .action((name, options) => {
    const folderName = lowercase(kebab(name));
    const insertPath = path.join(
      paths.baseDir,
      options.parent.root,
      options.parent.path
    );

    utils.assert(
      utils.existsSync(insertPath),
      '"make" insert path does not exist.'
    );

    utils.info(`Creating state "${name}"...`);

    utils.exists(`${insertPath}${folderName}`)
      .then(() => utils.exit(
        `State folder with name "${folderName}" already exists.`
      ))
      .catch(() => utils.mkdir(`${insertPath}${folderName}`))
      .then(() => Promise.all([
        utils.read(paths.reducerStub, 'utf8'),
        utils.read(paths.actionStub, 'utf8'),
        utils.read(paths.selectorStub, 'utf8'),
      ]))
      .then(res => {
        const actionTypes = options.actions
          .map(action => `${name}_${action}`)
          .map(snakeCase)
          .map(uppercase);

        return Promise.all([
          Promise.resolve(template(res[0])({
            actionTypes,
            reducers: options.reducers,
          })),
          Promise.resolve(template(res[1])({
            actions: options.actions,
            types: actionTypes,
          })),
          Promise.resolve(template(res[2])({
            selectors: options.selectors,
          })),
        ]);
      })
      .then(res => Promise.all([
        utils.write(`${insertPath}${folderName}/reducer.js`, res[0]),
        utils.write(`${insertPath}${folderName}/actions.js`, res[1]),
        utils.write(`${insertPath}${folderName}/selectors.js`, res[2]),
      ]))
      .then(() => utils.success(
        `State folder successfully created!
        ==> "${insertPath}${folderName}/"
        ==> "${insertPath}${folderName}/reducer.js"
        ==> "${insertPath}${folderName}/actions.js"
        ==> "${insertPath}${folderName}/selectors.js"`
      ))
      .catch(utils.exit);
  });
