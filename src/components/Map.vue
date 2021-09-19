<template>
  <section id="map" class="map"></section>
</template>

<style scoped>
.map {
  width: 74.5%;
  height: 100%;
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

    getMap() {
      this.GET_MAP();
    },

    clearMap() {
      this.LETS_CLEAR_MAP();
    },

    setClusterer() {
      let clusterer = new ymaps.Clusterer();
      this.LETS_SET_CLUSTERER(clusterer);
    },
  },
}
</script>
