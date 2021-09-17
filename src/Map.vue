<template>
  <section>
    <button @click="showData">show data</button>
    <div id="map" class="map"></div>
  </section>
</template>

<style scoped>
/* Imports */
@import url('css/fonts.css');
@import url('css/vars.css');

.map {
  width: 500px;
  height: 500px;
}
</style>

<script>
// State actions
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: 'Map',

  components: {
  },

  created() {
    this.getReady();
  },

  computed: {
    ...mapState({
      map: state => state.map,
      apiReady: state => state.condition.apiReady,
    }),

    ...mapGetters([
      'objectsCoords'
    ]),
  },

  watch: {
    apiReady() {
      if (this.apiReady) {
        this.getMap();
        this.clearMap();
      }
    },
  },

  methods: {
    showData() {
      console.log(this.map);
      console.log(this.$store.getters.countryFilter);
      console.log(this.$store.getters.objectsCoords);
    },

    ...mapActions([
      'GET_READY',
      'GET_MAP',
      'LETS_CLEAR_MAP'
    ]),

    getReady() {
      this.GET_READY();
    },

    getMap() {
      this.GET_MAP();
    },

    clearMap() {
      this.LETS_CLEAR_MAP();
    },

    setObjects() {
    },
  },
}
</script>
