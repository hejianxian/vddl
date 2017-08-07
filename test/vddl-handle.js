import test from 'ava';
import Vue from 'vue/dist/vue.common.js'; // Runtime + Compiler

import vddlHandle from '../src/components/vddl-handle.vue';
import { createVue, getRenderedText } from './utils.js';

Vue.config.productionTip = false;

test('vddl-handle name', t => {
  t.is('vddl-handle', vddlHandle.name);
	t.pass();
});

test('vddl-handle className', t => {
  const $handle = getRenderedText(vddlHandle, {});
  t.is('vddl-handle', $handle.classList[0]);
	t.pass();
});

test('vddl-handle offset top/left', t => {
  const $handle = getRenderedText(vddlHandle, {
    handleLeft: 20,
    handleTop: 20,
  });
  t.is('vddl-handle', $handle.classList[0]);
	t.pass();
});

