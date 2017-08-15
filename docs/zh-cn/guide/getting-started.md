## 开始

`Vddl`是基于 HTML5 drag &amp; drop API 开发的一系列组件组合而成的列表拖放组件库，包括`vddl-draggable`、 `vddl-list`、 `vddl-handle`、 `vddl-nodrag`、 `vddl-placeholder`。同时支持 Vuejs 1.0 和 2.0 版本，支持所有主流的浏览器，支持构建树形和其他复杂结构的嵌套列表。

> **不支持触摸屏设备**, 因为触屏设备并没有实现 HTML5 的拖放标准。但是，你可以使用 [shim](https://github.com/timruffles/ios-html5-drag-drop-shim) 来让触屏设备支持拖放事件。


在开始之前，你应该对以下优秀的工具或者库有一定的了解：

* [ES6 and Babel](https://babeljs.io/learn-es2015/)
* [Vue Js](http://vuejs.org/) 和 [NPM](http://npmjs.org/)
* [单文件组件 .vue](http://vue-loader.vuejs.org/en/index.html)
* [项目构建及打包工具 Webpack](http://webpack.github.io/)
* [Vuex](http://vuex.vuejs.org/)

#### 安装

````bash
npm install --save vddl
# 或者
yarn add vddl
````

#### 使用

```js
import Vue from 'vue';
import Vddl from 'vddl';

Vue.use(Vddl);
```

**注意:** 如果你使用的是 Vue1.0，你应该像下面那样引入：

```js
import Vddl from 'vddl/dist/vddl.js'; // Full build with template opiton
```

因为`vddl`的默认打包方法是 [runtime-only](https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only)，默认的入口文件是`vddl.runtime.js`，是不包含 template 选项的。
