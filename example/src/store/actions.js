import {
  INSERT_ITEM,
  DELETE_ITEM
} from './mutation-types.js';

export const inserItem = ({ commit }, draggable) => {
  commit(INSERT_ITEM, draggable);
};

export const delItem = ({ commit }, index) => {
  commit(DELETE_ITEM, index);
};
