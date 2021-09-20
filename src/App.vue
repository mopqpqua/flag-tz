<template>
  <main class="app">
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
      styles: state => state.styles,
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

      this.updateClusterer();

      map.geoObjects.add(map.clusterer);

      this.centerClusterer(map.clusterer);
    },

    makePlacemark(object) {
      return [object.coords,
      // Properties
      {
        name: object.name,
        director: object.director,
        phone: object.phone,
        email: object.email,
      },
      // Options
      {
        hideIconOnBalloonOpen: false,
        // Disable default click event to
        // change it to custom
        openBalloonOnClick: false,
        preset: 'islands#nightCircleIcon',
        balloonContentLayout: this.styles.balloonLayout,
      }];
    },

    makeQuery() {
      let storage = [];

      for (let object of this.mapObjects) {
        let placemark = new ymaps.Placemark(...this.makePlacemark(object));

        // Add placemark reference to object
        // to open balloon in the future
        object.placemark = placemark;
        storage.push(placemark);
      }

      return storage;
    },

    updateClusterer() {
      // Clean up clusterer
      this.map.clusterer.removeAll();

      // And add new objects into it
      for (let object of this.mapObjects) {
        let placemark = new ymaps.Placemark(...this.makePlacemark(object));

        // Centering on click
        placemark.events.add('click', function(event) {
          let object = event.get('target');
          let coords = event.get('coords');

          object.balloon.open().then(() => {
            object.getMap().setCenter(coords, object.getMap().zoom, {
              checkZoomRange: true,
              duration: 300,
            });
          })
        });

        this.map.clusterer.add(placemark);
      }
    },

    checkQueries() {
      let result;

      // Check if we already have
      // current country in queries
      for (let country in this.geoQueries) {
        if (result) continue;
        result = this.currentCountry == country;
      }

      return result;
    },

    centerClusterer(clusterer) {
      // Centering on current country clusterer
      this.map.setBounds(clusterer.getBounds());
    },
  },
}
</script>
