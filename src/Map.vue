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
      'mapObjects'
    ]),
  },

  watch: {
    apiReady() {
      if (this.apiReady) {
        this.getMap();
        this.clearMap();
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
      console.log(this.$store.getters.mapObjects);
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

    changeCountry(event) {
      let country = event.target.value;
      this.SET_COUNTRY(country);
    },

    setObjects() {
      if (this.mapObjects === undefined) return;
      // Make clusterer of objects
      let clusterer = new ymaps.Clusterer();

      // Filling clusterer
      for (let object of this.mapObjects) {
        let placemark = new ymaps.Placemark(...this.makePlacemark(object));

        // Centering on click
        placemark.events.add('click', function(event) {
          let object = event.get('target');
          let coords = event.get('coords');

          object.getMap().setCenter(coords);
        });

        clusterer.add(placemark);
      }

      // Clean up
      this.map.geoObjects.removeAll();

      // Adding clusterer to map
      this.map.geoObjects.add(clusterer);
      this.centerClusterer(clusterer);
    },

    makePlacemark(object) {
      return [object.coords,
      // Properties
      {
        balloonContentHeader: object.name,
        balloonContentBody: object.director,
        balloonContentFooter: object.phone,
      },
      // Options
      {}];
    },

    centerClusterer(clusterer) {
      // Centering on current country clusterer
      this.map.setBounds(clusterer.getBounds());
    },
  },
}
</script>
