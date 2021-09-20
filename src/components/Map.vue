<template>
  <section id="map" class="map"></section>
</template>

<style>
.map {
  width: 74.5%;
  height: 100%;
}

.balloon {
  padding: 0 20px 20px 20px;
}


/* Balloon start */
.balloon__title {
  font-size: 14px;
  color: var(--orange-color);
}

.balloon__email {
  color: var(--blue-color);
}

.balloon__email:active {
  color: var(--orange-color);
}

.balloon__email:visited {
  color: var(--blue-color);
}
/* Balloon end */
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
        this.setStyles();
        this.clearMap();
        this.setClusterer();
      }
    },
  },

  methods: {
    ...mapActions([
      'GET_MAP',
      'LETS_SET_STYLES',
      'LETS_CLEAR_MAP',
      'LETS_SET_CLUSTERER'
    ]),

    getMap() {
      this.GET_MAP();
    },

    setStyles() {
      this.LETS_SET_STYLES();
    },

    clearMap() {
      this.LETS_CLEAR_MAP();
    },

    setClusterer() {
      let clusterer = new ymaps.Clusterer({
        preset: 'islands#nightClusterIcons',
      });

      this.LETS_SET_CLUSTERER(clusterer);
    },
  },
}
</script>
