import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { rollup } from 'rollup';

import { default as vueConfig, pack } from './config/rollup-plugin-vue.config';
import bubleConfig from './config/buble.config';

let desc = '.runtime';
if (process.argv.pop() === '--compiler') {
  vueConfig.compileTemplate = false;
  desc = '';
};

let cache;
let banner =
  '/*!\n' +
  ' * Vddl.js v' + pack.version + '\n' +
  ' * (c) ' + new Date().getFullYear() + ' Hejx\n' +
  ' * Released under the MIT License.\n' +
	' * ' + pack.homepage + '\n' +
  ' */\n';

const config = {
  entry: 'src/install.js',
  targets: [
    { format: 'es', dest: `dist/${pack.name}${desc}.esm.js` },
    { format: 'cjs', dest: `dist/${pack.name}${desc}.common.js` },
    { format: 'umd', dest: `dist/${pack.name}${desc}.js`, moduleName: 'DragAndDropList' },
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
