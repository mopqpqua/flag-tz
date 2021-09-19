<template>
  <ul class="offices-list" v-show="state.isOpen">
    <li
      class="office"
      v-for="office in city.objects"
      :key="office.name"
      @click="showOnMap(office)">
      <p class="office__name info">{{ office.name }}</p>
      <p class="info">{{ office.director }}</p>
      <p class="info">{{ office.phone }}</p>
      <a class="office__email info">{{ office.email }}</a>
    </li>
  </ul>
</template>

<style scoped>
.offices-list {
  list-style-type: none;
  padding-inline-start: 0;

  margin: 0 0 0 8%;

  font-family: 'regular';
}


/* Office start */
.office {
  margin: 0 0 45px 0;
}

.office__name {
  font-family: 'bold', Arial, Helvetica, sans-serif;
  font-size: 17px;

  color: var(--indigo-color);
}
/* Office end */


/* Info start */
.info {
  margin: 25px 0 25px 0;
}
/* Info end */
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
      this.map.setCenter(office.coords, this.map.zoom, {
        checkZoomRange: true,
        duration: 300,
      });
    },
  },
}
</script>
