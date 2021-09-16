// Mutation types
import { SET_MAP } from "./mutation-types";
import { CLEAR_MAP } from "./mutation-types";
// Action types
import { GET_MAP } from "./action-types";
import { LETS_CLEAR_MAP } from "./action-types";

export default {
  state: {
    map: {},
  },

  getters: {
  },

  mutations: {
    [SET_MAP](state) {
      ymaps.ready.call(state, function() {
        // Creating map object
        state.map = new ymaps.Map('map', {
          center: [55.76, 37.64],
          zoom: 10,
        });
      });
    },

    // Removing controls from the map
    [CLEAR_MAP](state) {
      ymaps.ready.call(state, function() {
        state.map.controls.remove('rulerControl');
        state.map.controls.remove('searchControl');
        state.map.controls.remove('trafficControl');
        state.map.controls.remove('typeSelector');
        state.map.controls.remove('zoomControl');
        state.map.controls.remove('geolocationControl');
        state.map.controls.remove('fullscreenControl');
      });
    }
  },

  actions: {
    [GET_MAP]({ commit }) {
      commit(SET_MAP);
    },

    [LETS_CLEAR_MAP]({ commit }) {
      commit(CLEAR_MAP);
    }
  },
};
