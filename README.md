<br>
<p align="center">
  <a href="http://hejx.space/vddl">
    <img src="https://raw.githubusercontent.com/hejianxian/vddl/master/media/Vddl-400.png" width="200" alt="vddl"/>
  </a>
</p>
<p align="center">
  Vue components for modifying lists with the HTML5 drag & drop API.
</p>

<p align="center">
  <a href="https://travis-ci.org/hejianxian/vddl"><img alt="Travis Status" src="https://img.shields.io/travis/hejianxian/vddl/master.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/vddl"><img alt="npm" src="https://img.shields.io/npm/v/vddl.svg?style=flat-square"></a>
  <a href="https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fhejianxian%2Fvddl?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fhejianxian%2Fvddl.svg?type=shield"/></a>
</p>


## Links

- [Documentation](http://hejx.space/vddl)
- [Online Demo](http://hejx.space/vddl-demo)
- [Vue drag&drop lists](https://github.com/hejianxian/vue-drag-and-drop-list)

## Features

- Supports VueJs versions 1.0 and 2.0
- Supports all modern browsers and Internet Explorer 9+
- Supports nested lists for building trees and other fancy structures

**Touch devices are not supported**, because they do not implement the HTML5 drag & drop standard. However, you can use a [shim](https://github.com/timruffles/ios-html5-drag-drop-shim) to make it work on touch devices as well.

## Installation

````bash
npm install --save vddl

# or
yarn add vddl
````

## Usage

```js
import Vue from 'vue';
import Vddl from 'vddl';

Vue.use(Vddl);
```

## Development

````bash
# dev
npm install
npm run watch

# build
npm run build

# run example
cd example && npm install
npm run dev
````

## License

MIT

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fhejianxian%2Fvddl.svg?type=large)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fhejianxian%2Fvddl?ref=badge_large)
