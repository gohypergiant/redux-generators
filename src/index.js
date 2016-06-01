const program = require('commander');
const version = require('../package.json').version;
const paths = require('./paths');

program
  .version(version)
  .option('-r, --root [path]', 'The root path of your redux application', paths.rootDir)
  .option('-p, --path [path]', 'The path you want to save the files to', './');

require('./commands/make');
require('./commands/make-reducer');
require('./commands/make-action');
require('./commands/make-selector');
require('./commands/make-container');

program.parse(process.argv);
