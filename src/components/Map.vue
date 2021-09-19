<template>
  <section id="map" class="map"></section>
</template>

<style>
.map {
  width: 74.5%;
  height: 100%;
}

.map__circle {
  width: 40px;
  height: 40px;

  position: absolute;
  top: -7px;
  left: -7px;

  border-radius: 50%;

  background: var(--indigo-color);
}

.map__circle--big {
  width: 60px;
  height: 60px;

  top: -9px;
  left: -9px;
}
</style>

<script>
// State
import { mapState } from 'vuex';
import { mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      apiReady: state => state.condition.apiReady,
    }),
  },

  watch: {
    apiReady() {
      if (this.apiReady) {
        this.makeLayouts();
        this.getMap();
        this.clearMap();
        this.setClusterer();
      }
    },
  },

  methods: {
    ...mapActions([
      'GET_MAP',
      'LETS_CLEAR_MAP',
      'LETS_SET_CLUSTERER'
    ]),

    makeLayouts() {
      let circleClass = ymaps.templateLayoutFactory.createClass(
        '<div class="map__circle"></div>'
      );

      let bigCircleClass = ymaps.templateLayoutFactory.createClass(
        '<div class="map__circle map__circle--big"></div>'
      );

      ymaps.layout.storage.add('circle', circleClass);
      ymaps.layout.storage.add('big-circle', bigCircleClass);
    },

    getMap() {
      this.GET_MAP();
    },

    clearMap() {
      this.LETS_CLEAR_MAP();
    },

    setClusterer() {
      let clusterer = new ymaps.Clusterer({
        clusterIconContentLayout: 'big-circle',
      });
      this.LETS_SET_CLUSTERER(clusterer);
    },
  },
}
</script>
