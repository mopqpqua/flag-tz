import Vue from 'vue';
import Vuex from 'vuex';

// Менеджер состояния
Vue.use(Vuex);

import Store from '@/store/store';
import App from '@/App';

// Иконки
import DownArrowIcon from '@/assets/img/down_arrow_icon.svg';
import UpArrowIcon from '@/assets/img/up_arrow_icon.svg';

const store = new Vuex.Store(Store);

new Vue({
  render: (v) => v(App),
  store,
}).$mount('#app');
