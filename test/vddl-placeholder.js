import test from 'ava';
import Vue from 'vue';

import vddlPlaceholder from '../src/components/vddl-placeholder.vue';
import { getRenderedText } from './utils.js';

test('vddl-placeholder', t => {
  let $placeholder = getRenderedText(vddlPlaceholder, {});
  t.is('vddl-placeholder', $placeholder.classList[0]);
	t.pass();
});
