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
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: 'Map',

  components: {
  },

  computed: {
    ...mapState([
      'map'
    ]),
  },

  created() {
    this.getMap();
    this.clearMap();
  },

  methods: {
    showData() {
      console.log(this.map);
    },

    ...mapActions([
      'GET_MAP',
      'LETS_CLEAR_MAP'
    ]),

    getMap() {
      this.GET_MAP();
    },

    clearMap() {
      this.LETS_CLEAR_MAP();
    },
  },
}
</script>
