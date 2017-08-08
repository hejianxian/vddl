import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { rollup } from 'rollup';
import clone from 'lodash/cloneDeep';

import { default as vueConfig, pack } from './config/rollup-plugin-vue.config';
import bubleConfig from './config/buble.config';

let cache;

let pkg = require('./package.json');
let banner =
  '/*!\n' +
  ' * Vddl.js v' + pkg.version + '\n' +
  ' * (c) ' + new Date().getFullYear() + ' Hejx\n' +
  ' * Released under the MIT License.\n' +
	' * ' + pkg.homepage + '\n' +
  ' */\n';

const config = {
  entry: 'src/install.js',
  targets: [
    { format: 'es', dest: `dist/${pack.name}.esm.js` },
    { format: 'cjs', dest: `dist/${pack.name}.common.js` },
    { format: 'umd', dest: `dist/${pack.name}.js`, moduleName: 'DragAndDropList' },
  ],
  plugins: [
    vue(vueConfig),
    buble(bubleConfig),
  ],
  useStrict: false,
  cache,
  banner,
};

export default config;
