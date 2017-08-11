## Getting started

`Vddl` is a series of vue components based on HTML5 drag &amp; drop API, including `vddl-draggable`, `vddl-list`, `vddl-handle`, `vddl-nodrag`, `vddl-placeholder`. It supports vue versions 1.0 and 2.0, supports all modern browsers, supports nested lists for building trees and other fancy structures.


> **Touch devices are not supported**, because they do not implement the HTML5 drag & drop standard. However, you can use a [shim](https://github.com/timruffles/ios-html5-drag-drop-shim) to make it work on touch devices as well.

Before the start, you should be familiar with these awesome tools/technologies:

* [ES6 and Babel](https://babeljs.io/learn-es2015/)
* [Vue Js](http://vuejs.org/) and [NPM](http://npmjs.org/) ecosystems
* Writing [.vue files](http://vue-loader.vuejs.org/en/index.html)
* [Webpack](http://webpack.github.io/) for tweaking the build system to your specific needs
* [Vuex](http://vuex.vuejs.org/)

#### Installation

````bash
npm install --save vddl
# Or
yarn add vddl
````

#### Usage

```js
import Vue from 'vue';
import Vddl from 'vddl';

Vue.use(Vddl);
```

**Note:** If you are use Vue1.0, it should import like this:

```js
import Vddl from 'vddl/dist/vddl.js'; // Full build with template opiton
```

Because the default build mode is [runtime-only](https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only), and the main entry is `vddl.runtime.js`.
