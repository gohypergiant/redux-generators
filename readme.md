# BPXL Redux CLI

A tool for scaffolding redux applications. This tool is opinionated towards the way we like to build our redux applications. We assume you are using the following packages:

- [reselect](https://github.com/reactjs/reselect)
- [redux-actions](https://github.com/acdlite/redux-actions)
- [react-redux](https://github.com/reactjs/react-redux)

### Quickstart
```bash
redux-cli make <name>
redux-cli make:reducer
redux-cli make:action
redux-cli make:selector
redux-cli make:container <name>
```

### Available Commands

|Command|Description|
|---|---|
|`redux-cli make <name>`|Creates a new folder using `<name>` that houses three files: `reducer.js`, `actions.js`, and `selectors.js` that are created based on passed in options and template files.
|`redux-cli make:reducer`|Creates a reducer based on passed in options and template files.|
|`redux-cli make:action`|Creates actions based on passed in options and template files.|
|`redux-cli make:selector`|Creates selectors based on passed in options and template files.|
|`redux-cli make:container <name>`|Creates a container component named `<name>` based on passed in options and template files.|

### Global Options

|Option|Description|
|---|---|
|`-r, --root [path]`|The root path for the CLI, defaults to current working directory|
|`-p, --path [path]`|The path based on root to insert the files, defaults to `./`|

You can also add a `.reduxclirc` file to your project root to set config values used in `redux-cli`. Here is an example `.reduxclirc` file with all available options:

```json
{
  "root": "./",
  "templates": "./templates",
  "reducerTemplate": "reducer.stub",
  "actionTemplate": "actions.stub",
  "selectorTemplate": "selectors.stub",
  "containerTemplate": "container.stub",
}
```

- `root` is the same as the global option
- `templates` is the path to your own custom templates directory
- `reducerTemplate` is the filename of your reducer template
- `actionTemplate` is the filename of your action template
- `selectorTemplate` is the filename of your selector template
- `containerTemplate` is the filename of your container template

### Custom templates

By default `redux-cli` will generate files for you with some great conventions and standards in mind. However, if you would like to have a set of your own templates, you can do so by creating a folder in your root directory to house your custom templates. This folder path will need to be set inside of a `.reduxclirc` file and all four template files will need to be present.

`reducerTemplate` gets passed the following data:

|Key|Type|Description|
|---|---|---|
|reducers|Array|A list of reducers that get combined together via `combineReducers`.|
|actionTypes|Array|A list of action types to pass to the reducers `handleActions` method.|

`actionTemplate` gets passed the following data:

|Key|Type|Description|
|---|---|---|
|actions|Array|A list of action creators that are created via `createAction`.|
|types|Array|A list of action types (based on actions) to pass to action creators.|

`selectorTemplate` gets passed the following data:

|Key|Type|Description|
|---|---|---|
|selectors|Array|A list of selectors that are created via `createSelector`.|

`containerTemplate` gets passed the following data:

|Key|Type|Description|
|---|---|---|
|name|String|The exported name of the container component.|
|selector|String|A selector to be passed as the first argument to the `connect` method.|

### `redux-cli make <name> [options]`

Creates a new folder using `<name>` that houses three files:
- `reducer.js`
- `actions.js`
- `selectors.js`

**Options**

|Option|Description|
|---|---|
|`--reducers`|A comma separated list of initial reducer items to add into your `reducer.js` file|
|`--selectors`|A comma separated list of initial selectors to add into your `selectors.js` file|
|`--actions`|A comma separated list of initial actions to add into your `actions.js` file|

**Example**
```javascript
// inside reducer.js
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import {
  TESTER_TEST_ACTION,
} from 'path/to/action-types';

const foo = handleActions({
  [TESTER_TEST_ACTION]: (state, { payload }) => payload,
});

const bar = handleActions({
  [TESTER_TEST_ACTION]: (state, { payload }) => payload,
});

const baz = handleActions({
  [TESTER_TEST_ACTION]: (state, { payload }) => payload,
});

export default combineReducers({
  foo,
  bar,
  baz,
});
```

### `redux-cli make:reducer [options]`

**Options**

|Option|Description|
|---|---|
|`--name`|The filename for the reducer file|
|`--items`|A comma separated list of initial reducer items to add into your reducer file|
|`--actions`|A comma separated list of initial action types to add into your reducer file|


### `redux-cli make:action [options]`

**Options**

|Option|Description|
|---|---|
|`--name`|The filename for the actions file|
|`--items`|A comma separated list of initial actions to add into your `actions.js` file|

**Example**
```javascript
import { createAction } from 'redux-actions';

import {
  FOO_ACTION,
  BAR_ACTION,
  BAZ_ACTION,
} from 'path/to/action-types';

export const fooAction = createAction(FOO_ACTION);
export const barAction = createAction(BAR_ACTION);
export const bazAction = createAction(BAZ_ACTION);
```

### `redux-cli make:selector [options]`

**Options**

|Option|Description|
|---|---|
|`--name`|The filename for the selectors file|
|`--items`|A list of initial selectors to add into your `selectors.js` file|

**Example**
```javascript
import { createSelector } from 'reselect';

export const fooSelector = createSelector();
export const barSelector = createSelector();
export const bazSelector = createSelector();
```

### `redux-cli make:container <name>`

Creates a container component exported with the passed in `<name>`. The file name is derived from kebab and lowercasing the `<name>`.

**Options**

|Option|Description|
|---|---|
|`--selector [name]`|The selector you want to use for your container component|

**Example**
```javascript
import { connect} from 'react-redux';

import {
  fooSelector,
} from 'path/to/selector';

const FooContainer = connect(
  fooSelector,
  dispatch => ({ })
);

export default FooContainer;
```
