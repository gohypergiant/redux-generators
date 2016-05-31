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
