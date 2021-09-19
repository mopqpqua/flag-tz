<template>
  <ul class="object-list__objects" v-show="state.isOpen">
    <li
      class="object-list__office"
      v-for="office in city.objects"
      :key="office.name"
      @click="showOnMap(office)">
      <p>{{ office.name }}</p>
      <p>{{ office.director }}</p>
      <p>{{ office.phone }}</p>
      <p>{{ office.email }}</p>
    </li>
  </ul>
</template>

<style scoped>
</style>

<script>
// State
import { mapState } from 'vuex';

export default {
  props: {
    city: {
      type: Object,
    },
  },

  data() {
    return {
      state: {
        isOpen: false,
      },
    };
  },

  computed: {
    ...mapState({
      map: state => state.map,
    }),
  },

  methods: {
    showOnMap(office) {
      office.placemark.balloon.open()
      .then(() => {
        this.centerObject(office);
      });
    },

    centerObject(office) {
      this.map.panTo(office.coords, this.map.zoom, {
        checkZoomRange: true,
        duration: 300,
      });
    },
  },
}
</script>
