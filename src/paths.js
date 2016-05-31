const path = require('path');

const templatesDir = path.join(__dirname, '../', 'templates');
const reducerStub = path.join(templatesDir, 'reducer.stub');
const actionStub = path.join(templatesDir, 'actions.stub');
const selectorStub = path.join(templatesDir, 'selectors.stub');
const containerStub = path.join(templatesDir, 'container.stub');

module.exports = {
  templatesDir,
  reducerStub,
  actionStub,
  selectorStub,
  containerStub,
};
