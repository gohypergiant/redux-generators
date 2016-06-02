const program = require('commander');
const path = require('path');
const template = require('lodash.template');
const lowercase = require('lodash.tolower');
const kebab = require('lodash.kebabcase');
const utils = require('../utils');
const paths = require('../paths');

program
  .command('make:container <name>')
  .option('--selector [name]', 'Selector for container component', 'testSelector')
  .action((name, options) => {
    const fileName = `${lowercase(kebab(name))}.js`;
    const insertPath = path.join(
      paths.baseDir,
      options.parent.root,
      options.parent.path
    );

    utils.assert(
      utils.existsSync(insertPath),
      '"make:container" insert path does not exist.'
    );

    utils.info(`Creating container component "${name}" inside "${fileName}"...`);

    utils.exists(`${insertPath}${fileName}.js`)
      .then(() => utils.exit(`Container component "${name}" already exists.`))
      .catch(() => utils.read(paths.containerStub, 'utf8'))
      .then(content => Promise.resolve(
        template(content)({
          name,
          selector: options.selector,
        })
      ))
      .then(content => utils.write(`${insertPath}/${fileName}`, content))
      .then(() => utils.success(
        `Container component ${name} successfully created! ==> "${insertPath}${fileName}.js"`
      ))
      .catch(utils.exit);
  });
