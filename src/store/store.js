// Mutation types
import { SET_READY } from "./mutation-types";
import { SET_MAP } from "./mutation-types";
import { CLEAR_MAP } from "./mutation-types";
import { SET_COUNTRY } from "./mutation-types";
import { SET_CLUSTERER } from "./mutation-types";

// Action types
import { GET_READY } from "./action-types";
import { GET_MAP } from "./action-types";
import { LETS_CLEAR_MAP } from "./action-types";

import { LETS_SET_CLUSTERER } from "./action-types";

export default {
  state: {
    map: {},

    currentCountry: '',

    geoQueries: {},

    objects: [{
      "name": "Белоруссия",
      "cities": [
        {
          "name": "Минск",
          "objects": [
            {
              "name": "Офис Голубиный",
              "director": "Голубев Сергей Алексеевич",
              "phone": 89996663333,
              "email": "golub@majl.com",
              "coords": [53.90, 27.57]
            },
            {
              "name": "Офис Шоколада",
              "director": "Шоколадов Матвей Алексеевич",
              "phone": 89996662222,
              "email": "choco@majl.com",
              "coords": [53.91, 27.52]
            }
          ]
        },
        {
          "name": "Брест",
          "objects": [
            {
              "name": "Офис Яркий",
              "director": "Яркий Борис Алексеевич",
              "phone": 89996661111,
              "email": "shine@majl.com",
              "coords": [52.09, 23.68]
            },
            {
              "name": "Офис Красивый",
              "director": "Красивый Слава Алексеевич",
              "phone": 89996668888,
              "email": "nice@majl.com",
              "coords": [52.09, 23.75]
            }
          ]
        },
        {
          "name": "Гомель",
          "objects": [
            {
              "name": "Офис Поэтичный",
              "director": "Поэтов Александр Пушкин",
              "phone": 89996667777,
              "email": "poet@majl.com",
              "coords": [52.43, 30.97]
            }
          ]
        },
        {
          "name": "Орша",
          "objects": [
            {
              "name": "Офис Пиццы",
              "director": "Пиццов Петр Борисович",
              "phone": 89996664444,
              "email": "pizza@majl.com",
              "coords": [54.50, 27.57]
            }
          ]
        },
        {
          "name": "Могилёв",
          "objects": [
            {
              "name": "Офис Заказов Пиццы",
              "director": "Заказчиков Алексей Борисович",
              "phone": 89996661111,
              "email": "order@majl.com",
              "coords": [53.90, 30.34]
            }
          ]
        }
      ]
    },
    {
      "name": "Россия",
      "cities": [
        {
          "name": "Екатеринбург",
          "objects": [
            {
              "name": "Офис Майкрософт",
              "director": "Гейтс Билл Алексеевич",
              "phone": 89996665566,
              "email": "gates@majl.com",
              "coords": [56.83, 60.58]
            },
            {
              "name": "Офис Эппл",
              "director": "Кук Тим Леонидович",
              "phone": 89996667788,
              "email": "cook@majl.com",
              "coords": [56.82, 60.61]
            }
          ]
        },
        {
          "name": "Челябинск",
          "objects": [
            {
              "name": "Офис Тесла",
              "director": "Маск Илон Евгеньевич",
              "phone": 89996662299,
              "email": "tesla@majl.com",
              "coords": [55.31, 61.45]
            },
            {
              "name": "Офис НАСА",
              "director": "Джим Брайденстайн Леонидович",
              "phone": 89996667788,
              "email": "nasa@majl.com",
              "coords": [55.14, 61.48]
            }
          ]
        },
        {
          "name": "Казань",
          "objects": [
            {
              "name": "Офис Старбакс",
              "director": "Старбаксович Юджин Маркович",
              "phone": 89996668855,
              "email": "starbucks@majl.com",
              "coords": [55.78, 49.12]
            },
            {
              "name": "Офис Чая",
              "director": "Шпаков Чай Олегович",
              "phone": 89996664466,
              "email": "tea@majl.com",
              "coords": [55.79, 49.12]
            }
          ]
        },
        {
          "name": "Омск",
          "objects": [
            {
              "name": "Офис Колец",
              "director": "Сауронов Саурон Сауронович",
              "phone": 89996668811,
              "email": "ring@majl.com",
              "coords": [54.97, 73.38]
            }
          ]
        },
        {
          "name": "Барнаул",
          "objects": [
            {
              "name": "Офис Палочек",
              "director": "Поттер Гарри Джеймсович",
              "phone": 89996664466,
              "email": "wizard@majl.com",
              "coords": [53.35, 83.71]
            }
          ]
        }
      ]
    }],

    condition: {
      apiReady: false,
    }
  },

  getters: {
    // Getting current country
    countryFilter(state) {
      return state.objects.find((item) => item.name == state.currentCountry);
    },

    // Getting objects coords of current country
    mapObjects(state, getters) {
      // If country is not chosen
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
        // Yandex Maps API is ready
        state.condition.apiReady = true;
      });
    },

    [SET_MAP](state) {
      // Creating map object
      state.map = new ymaps.Map('map', {
        center: [56.83, 60.59],
        zoom: 4,
      });
    },

    // Removing controls from the map
    [CLEAR_MAP](state) {
      let controlToRemove = ['rulerControl', 'searchControl', 'trafficControl', 'typeSelector', 'zoomControl', 'geolocationControl', 'fullscreenControl'];

      controlToRemove.forEach((item) => state.map.controls.remove(item));
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

    [LETS_CLEAR_MAP]({ commit }) {
      commit(CLEAR_MAP);
    },

    [LETS_SET_CLUSTERER](context, clusterer) {
      context.commit(SET_CLUSTERER, clusterer);
    }
  },
};
