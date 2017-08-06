import {
  INSERT_ITEM,
  DELETE_ITEM,
} from './mutation-types.js';

const state = {
  "lists": [
    {
      "label": "Item A1"
    },
    {
      "label": "Item A2"
    },
    {
      "label": "Item A3"
    },
    {
      "label": "Item A4"
    },
    {
      "label": "Item A5"
    }
  ]
};

const mutations = {
  [INSERT_ITEM] (state, { index, item }) {
    state.lists.splice(index, 0, item);
  },
  [DELETE_ITEM] (state, index) {
    state.lists.splice(index, 1);
  },
};

export default {
  state,
  mutations,
};
