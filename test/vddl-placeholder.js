import test from 'ava';
import Vue from 'vue/dist/vue.common.js'; // Runtime + Compiler

import vddlPlaceholder from '../src/components/vddl-placeholder.vue';
import { createVue, getRenderedText } from './utils.js';

Vue.config.productionTip = false;

test('vddl-placeholder name', t => {
  t.is('vddl-placeholder', vddlPlaceholder.name);
	t.pass();
});

test('vddl-placeholder className', t => {
  const $placeholder = getRenderedText(vddlPlaceholder, {});
  t.is('vddl-placeholder', $placeholder.classList[0]);
	t.pass();
});

test('vddl-pplaceholder slot', t => {
  const tpl = '<vddl-placeholder>hello</vddl-placeholder>';

  Vue.component(vddlPlaceholder.name, vddlPlaceholder);
  const $placeholder = new Vue({ template: tpl }).$mount().$el;

  t.is('hello', $placeholder.innerHTML);
	t.pass();
});
