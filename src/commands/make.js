const program = require('commander');
const path = require('path');
const template = require('lodash.template');
const snakeCase = require('lodash.snakecase');
const uppercase = require('lodash.toupper');
const utils = require('../utils');
const paths = require('../paths');

program
  .command('make <name>')
  .option('--reducers [list]', 'Add reducer items', utils.list, ['test'])
  .option('--actions [list]', 'Add action items', utils.list, ['testAction'])
  .option('--selectors [list]', 'Add selector items', utils.list, ['testSelector'])
  .action((name, options) => {
    const insertPath = path.join(options.parent.root, options.parent.path);

    utils.info(`Creating state "${name}"...`);
    utils.exists(name)
      .then(() => utils.exit(`State "${name}" already exists.`))
      .catch(() => utils.mkdir(`${insertPath}${name}`))
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
        utils.write(`${insertPath}${name}/reducer.js`, res[0]),
        utils.write(`${insertPath}${name}/actions.js`, res[1]),
        utils.write(`${insertPath}${name}/selectors.js`, res[2]),
      ]))
      .then(() => utils.success(`State "${name}" successfully created!`))
      .catch(utils.exit);
  });
