import Vue from 'vue';

Vue.config.productionTip = false;

let id = 0;
const createElm = () => {
  const elm = document.createElement('div');
  elm.id = 'app' + ++id;
  document.body.appendChild(elm);
  return elm;
}

export const createVue = (Comp, mounted = false) => {
  if (Object.prototype.toString.call(Comp) === '[object String]') {
    Comp = { template: Comp };
  }
  return new Vue(Comp).$mount(mounted === false ? null : createElm());
};

export const getRenderedText = (Component, propsData) => {
  const Ctor = Vue.extend(Component);
  const vm = new Ctor({ propsData }).$mount();
  return vm.$el;
}
