import Vue from 'vue';
import Vuex from 'vuex';

import authentication from './authentication';
import client from './client';
import alert from './alert';
import category from './category';
import product from './product';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      authentication,
      client,
      alert,
      category,
      product,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
  });

  return Store;
}
