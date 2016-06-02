const path = require('path');
const rcfile = require('rcfile');
const utils = require('./utils');
const defaultConfig = require('./config');
const rcConfig = rcfile('reduxclirc', { configFileName: '.reduxclirc' });
const config = Object.assign({}, defaultConfig, rcConfig);

const baseDir = process.cwd();
const templatesDir = utils.existsSync(path.join(baseDir, config.templates)) ?
  path.join(baseDir, config.templates) :
  path.join(__dirname, config.templates);

const reducerStub = path.join(templatesDir, config.reducerTemplate);
const actionStub = path.join(templatesDir, config.actionTemplate);
const selectorStub = path.join(templatesDir, config.selectorTemplate);
const containerStub = path.join(templatesDir, config.containerTemplate);

utils.assert(utils.existsSync(reducerStub), 'Reducer template stub not found.');
utils.assert(utils.existsSync(actionStub), 'Action template stub not found.');
utils.assert(utils.existsSync(selectorStub), 'Selector template stub not found.');
utils.assert(utils.existsSync(containerStub), 'Container template stub not found.');

module.exports = {
  rootDir: config.root,
  baseDir,
  templatesDir,
  reducerStub,
  actionStub,
  selectorStub,
  containerStub,
};
