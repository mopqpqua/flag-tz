import Vue from 'vue';
import Vuex from 'vuex';

// State manager
Vue.use(Vuex);

import Store from '@/store/store';
import App from '@/App';

// Icons
import DownArrowIcon from '@/assets/down_arrow_icon.svg';
import UpArrowIcon from '@/assets/up_arrow_icon.svg';

const store = new Vuex.Store(Store);

new Vue({
  render: (v) => v(App),
  store,
}).$mount('#app');
