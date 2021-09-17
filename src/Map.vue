<template>
  <section>
    <button @click="showData">show data</button>
    <button @click="changeCountry" value="Белоруссия">Белоруссия</button>
    <button @click="changeCountry" value="Россия">Россия</button>
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
import { mapMutations } from 'vuex';
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
      currentCountry: state => state.currentCountry,
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
        this.setObjects();
      }
    },

    // Change country
    currentCountry() {
      if (this.apiReady) {
        this.setObjects();
      }
    },
  },

  methods: {
    showData() {
      console.log(this.map);
      console.log(this.$store.getters.countryFilter);
      console.log(this.$store.getters.objectsCoords);
    },

    ...mapMutations([
      'SET_COUNTRY'
    ]),

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
      if (this.objectsCoords !== undefined) return;
      // Make collection of objects
      let collection = new ymaps.GeoObjectCollection();

      // Filling collection
      for (let coords of this.objectsCoords) {
        collection.add(new ymaps.Placemark(coords));
      }

      // Adding collection to map
      this.map.geoObjects.add(collection);
    },

    changeCountry(event) {
      let country = event.target.value;
      this.SET_COUNTRY(country);
    },
  },
}
</script>
