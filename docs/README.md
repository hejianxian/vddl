# vddl

Vue components for modifying lists with the HTML5 drag & drop API.

## Installation

````bash
npm install --save vddl

// or
yarn add vddl
````

## Usage

```js
import Vue from 'vue';
import Vddl from 'vddl';

Vue.use(Vddl);
```

## Browser Support

Modern browsers and Internet Explorer 10+.

**Touch devices are not supported**, because they do not implement the HTML5 drag & drop standard. However, you can use a [shim](https://github.com/timruffles/ios-html5-drag-drop-shim) to make it work on touch devices as well.

## Development

````bash
npm install
npm run watch

// build
npm run build

// run example
cd example && npm install
npm run dev
````
