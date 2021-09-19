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

      let storage = [];
      let clusterer = new ymaps.Clusterer();

      for (let object of this.mapObjects) {
        let placemark = new ymaps.Placemark(...this.makePlacemark(object));
        // Add name to identify placemark
        // if we need
        placemark.name = object.name;

        // Making placemark reference
        // in objects
        object.placemark = placemark;

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
        clusterer.add(new ymaps.Placemark(...this.makePlacemark(object)));
      }

      let query = ymaps.geoQuery(storage);

      query.countryName = this.currentCountry;
      query.addToMap(this.map);
      query.each(function(placemark) {
        placemark.options.set('visible', false);
      });

      this.geoQueries[this.currentCountry] = query;

      this.map.removeAll();
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
