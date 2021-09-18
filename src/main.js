import Vue from 'vue';
import Vuex from 'vuex';

// State manager
Vue.use(Vuex);

import Store from '@/store/store';
import App from '@/App';

const store = new Vuex.Store(Store);

new Vue({
  render: (v) => v(App),
  store,
}).$mount('#app');
