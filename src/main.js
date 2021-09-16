import Vue from 'vue';
import Vuex from 'vuex';

// State manager
Vue.use(Vuex);

import Store from '@/store/store';
import Map from '@/Map';

const store = new Vuex.Store(Store);

new Vue({
  render: (v) => v(Map),
  store,
}).$mount('#map');
