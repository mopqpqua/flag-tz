// Типы мутаций
import { SET_READY } from "./mutation-types";
import { SET_MAP } from "./mutation-types";
import { SET_STYLES } from "./mutation-types";
import { CLEAR_MAP } from "./mutation-types";
import { SET_COUNTRY } from "./mutation-types";
import { SET_CLUSTERER } from "./mutation-types";

// Типы экшенов
import { GET_READY } from "./action-types";
import { GET_MAP } from "./action-types";
import { LETS_SET_STYLES } from "./action-types";
import { LETS_CLEAR_MAP } from "./action-types";

import { LETS_SET_CLUSTERER } from "./action-types";

// JSON пример исходных данных
import Data from '@/example.json';

export default {
  state: {
    map: {},

    styles: {
      balloonLayout: '',
    },

    currentCountry: '',

    geoQueries: {},

    objects: Data,

    condition: {
      apiReady: false,
    }
  },

  getters: {
    // Достаем из исходных данных текущую страну
    countryFilter(state) {
      return state.objects.find((item) => item.name == state.currentCountry);
    },

    // Достаем из текущей страны все объекты (офисы)
    mapObjects(state, getters) {
      // Проверка на то, что страна выбрана
      return getters.countryFilter ? getters.countryFilter.cities.map((item) => {
        return item.objects.map((item) => {
          return item;
        });
      }).flat() : false;
    },
  },

  mutations: {
    [SET_READY](state) {
      ymaps.ready.call(state, function() {
        // Yandex Maps API готовы
        state.condition.apiReady = true;
      });
    },

    [SET_MAP](state) {
      // Создание карты
      state.map = new ymaps.Map('map', {
        center: [56.83, 60.59],
        zoom: 4,
      });
    },

    [SET_STYLES](state) {
      // Кастомный шаблон содержимого балуна
      // P.S: к сожалению я не смог изменить стили всего макета
      let balloonContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="balloon">' +
        '<h3 class="balloon__title">{{ properties.name }}</h3>' +
        '<p>{{ properties.director }}</p>' +
        '<p>{{ properties.phone }}</p>' +
        `<a class="balloon__email" href="mailto:{{ properties.email }}"}>{{ properties.email }}</a>` +
        '</div>'
      );

      state.styles.balloonLayout = balloonContentLayout;
    },

    // Удаление лишних элементов управления с карты
    [CLEAR_MAP](state) {
      let controlToRemove = ['rulerControl', 'searchControl', 'trafficControl', 'typeSelector', 'zoomControl', 'geolocationControl', 'fullscreenControl'];

      controlToRemove.forEach((item) => state.map.controls.remove(item));

      // Делаем карту черно-белой
      document.querySelector('canvas').style.filter = 'grayscale(100%)';
    },

    [SET_COUNTRY](state, country) {
      state.currentCountry = country;
    },

    [SET_CLUSTERER](state, clusterer) {
      state.map.clusterer = clusterer;
    }
  },

  actions: {
    [GET_READY]({ commit }) {
      commit(SET_READY);
    },

    [GET_MAP]({ commit }) {
      commit(SET_MAP);
    },

    [LETS_SET_STYLES]({ commit }) {
      commit(SET_STYLES);
    },

    [LETS_CLEAR_MAP]({ commit }) {
      commit(CLEAR_MAP);
    },

    [LETS_SET_CLUSTERER](context, clusterer) {
      context.commit(SET_CLUSTERER, clusterer);
    }
  },
};
