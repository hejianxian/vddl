import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { rollup } from 'rollup';
import clone from 'lodash/cloneDeep';

import { default as vueConfig, pack } from './config/rollup-plugin-vue.config';
import bubleConfig from './config/buble.config';

let cache;

const config = {
  entry: 'src/install.js',
  targets: [
    { format: 'es', dest: `dist/${pack.name}.js` },
    { format: 'cjs', dest: `dist/${pack.name}.common.js` },
    { format: 'umd', dest: `dist/${pack.name}.umd.js`, moduleName: 'DragAndDropList' },
  ],
  plugins: [
    vue(vueConfig),
    buble(bubleConfig),
  ],
  useStrict: false,
  cache,
};

export default config;
