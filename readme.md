# Redux Generators

Redux Generators is a lightweight, opinionated CLI that helps scaffold a scalable approach to Redux.

[![Demo Video](https://asciinema.org/a/79777.png)](https://asciinema.org/a/79777)

Many Redux applications maintain separate directories for actions, reducers, and selectors. While this may work for small apps, maintaining files in three different directories for every new feature becomes tedious as an application grows. Utilizing a single directory per feature is a [more scalable approach](http://bpxl-labs.github.io/redux-handbook/sections/folder-file-structure.html), and allows a Redux directory structure to model the application's state tree.

If you've struggled with structuring or scaling Redux applications, or are just looking for some convenience tooling to get more work done faster, Redux Generators is for you.

### Prerequisites
Redux Generators requires the following utilities:
- [reselect](https://github.com/reactjs/reselect) selector library for Redux
- [redux-actions](https://github.com/acdlite/redux-actions) Flux Standard Action utilities for Redux
- [react-redux](https://github.com/reactjs/react-redux) Official React bindings for Redux

If you aren't using them already, install and add to your project's dependencies with:

`$ npm i reselect redux-actions react-redux --save`

### Sample usage

1. `$ npm i redux-generators -g`
2. `$ rg make example --reducers=one,two,three --actions=oneAction,twoAction,threeAction`

### Available Commands

|Command|Description| |
|---|---|---|
|`rg make <name>`|Creates a reducer, actions, and selectors|[Options & Usage](https://github.com/bpxl-labs/redux-generators/tree/feature/readme-overhaul#-rg-make-name-options)|
|`rg make:reducer [options]`|Creates a reducer.|[Options & Usage](https://github.com/bpxl-labs/redux-generators/tree/feature/readme-overhaul#-rg-makereducer-options)|
|`rg make:action [options]`|Creates actions.|[Options & Usage](https://github.com/bpxl-labs/redux-generators/tree/feature/readme-overhaul#-rg-makeaction-options)|
|`rg make:selector [options]`|Creates selectors.|[Options & Usage](https://github.com/bpxl-labs/redux-generators/tree/feature/readme-overhaul#-rg-makeselector-options)|
|`rg make:container <name> [options]`|Creates a container component|[Options & Usage](https://github.com/bpxl-labs/redux-generators/tree/feature/readme-overhaul#-rg-makecontainer-name)|

### Global Options

|Option|Description|
|---|---|
|`-r, --root [path]`|The root path for the CLI, defaults to current working directory|
|`-p, --path [path]`|The path based on root to insert the files, defaults to `./`|

You can also add a `.rgrc` file to your project root to set config values used in `redux-generators`. Here is an example `.rgrc` file with all available options:

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

By default `redux-generators` will generate files for you with some great conventions and standards in mind. However, if you would like to have a set of your own templates, you can do so by creating a folder in your root directory to house your custom templates. This folder path will need to be set inside of a `.rgrc` file and all four template files will need to be present. All template files are rendered using [lodash's `template`](https://lodash.com/docs#template) method.

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

### `$ rg make <name> [options]`

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

### `$ rg make:reducer [options]`

**Options**

|Option|Description|
|---|---|
|`--name`|The filename for the reducer file|
|`--items`|A comma separated list of initial reducer items to add into your reducer file|
|`--actions`|A comma separated list of initial action types to add into your reducer file|


### `$ rg make:action [options]`

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

### `$ rg make:selector [options]`

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

### `$ rg make:container <name>`

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

For more on how we structure Redux apps at Black Pixel, check out our [Redux Handbook](http://bpxl-labs.github.io/redux-handbook/).

---

Website: [blackpixel.com](https://blackpixel.com) &nbsp;&middot;&nbsp;
GitHub: [@bpxl-labs](https://github.com/bpxl-labs/) &nbsp;&middot;&nbsp;
Twitter: [@blackpixel](https://twitter.com/blackpixel)
