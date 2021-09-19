<template>
  <main class="app">
    <button @click="showData">show data</button>
    <Sidebar></Sidebar>
    <Map></Map>
  </main>
</template>

<style scoped>
/* Imports */
@import url('css/fonts.css');
@import url('css/vars.css');

.app {
  width: 100%;
  height: 100vh;

  display: flex;
}
</style>

<script>
// State
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

// Components
import Map from '@components/Map'
import Sidebar from '@components/Sidebar'

export default {
  name: 'App',

  components: {
    Map,
    Sidebar,
  },

  created() {
    this.getReady();
  },

  computed: {
    ...mapState({
      map: state => state.map,
      currentCountry: state => state.currentCountry,
      geoQueries: state => state.geoQueries,
      apiReady: state => state.condition.apiReady,
    }),

    ...mapGetters([
      'mapObjects'
    ]),
  },

  watch: {
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
      console.log(this.$store.state.geoQueries);
    },

    ...mapActions([
      'GET_READY',
    ]),

    getReady() {
      this.GET_READY();
    },

    setObjects() {
      if (this.mapObjects === undefined) return;
      let query;
      let map = this.map;

      // If we dont have query for
      // current country
      // we will make it
      if (!this.checkQueries()) {
        query = ymaps.geoQuery(this.makeQuery());
        this.geoQueries[this.currentCountry] = query;

        // Add every object of query
        // to map...
        query.addToMap(map);

        // ...then hide them
        query.each(function(placemark) {
          placemark.options.set('visible', false);
        });
      } else {
        query = this.geoQueries[this.currentCountry];
      }

      console.log(query);

      query.each(function(placemark) {
        map.clusterer.add(placemark);
      });

      map.geoObjects.add(map.clusterer);

      this.centerClusterer(map.clusterer);
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

    makeQuery() {
      let storage = [];

      for (let object of this.mapObjects) {
        let placemark = new ymaps.Placemark(...this.makePlacemark(object));

        // Centering on click
        placemark.events.add('click', function(event) {
          let object = event.get('target');
          let coords = event.get('coords');

          object.getMap().setCenter(coords, object.getMap().zoom, {
            checkZoomRange: true,
            duration: 300,
          });
        });

        storage.push(placemark);
      }

      return storage;
    },

    checkQueries() {
      let result;

      // Check if we already have
      // current country in queries
      for (let country in this.geoQueries) {
        result = this.currentCountry == country;
      }

      return result;
    },

    makeGeoQuery() {},

    centerClusterer(clusterer) {
      // Centering on current country clusterer
      this.map.setBounds(clusterer.getBounds());
    },
  },
}
</script>
