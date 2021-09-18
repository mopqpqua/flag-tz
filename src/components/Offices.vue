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
      this.centerObject(office);
      this.openBalloon(office);
    },

    openBalloon(office) {
      this.map.balloon.open(office.coords,
        { content: `<h1>${office.name}</h1>` },
        { closeButton: true });

      // console.log(this);
      // console.log(office.placemark.getMap());
      // console.log(office.placemark.getParent().getGeoObjects());

      // All cluster objects
      // for (let object of office.placemark.getParent().getGeoObjects()) {
      //   if (object.name == office.name) {
      //     object.balloon.open();
      //     break;
      //   }
      // }

      // office.placemark.balloon.open(
      //   office.coords,
      //   { content: `<h1>${office.name}</h1>` },
      //   { closeButton: true }
      // );
    },

    centerObject(office) {
      this.map.panTo(office.coords, this.map.zoom, {
        checkZoomRange: true,
        duration: 1000,
      });
    },
  },
}
</script>
