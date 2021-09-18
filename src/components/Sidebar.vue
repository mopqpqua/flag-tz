<template>
  <aside class="sidebar">

    <div class="control">
      <button class="button control-button" @click="changeCountry" value="Белоруссия">Белоруссия</button>
      <button class="button control-button" @click="changeCountry" value="Россия">Россия</button>
    </div>

    <div class="object-list" v-if="countryFilter">
      <div
        class="city"
        v-for="city in countryFilter.cities" :key="city.name">
        <div class="city__title" @click="toggleOffices(city.name)">
          <p
            class="city__name">{{ city.name }}</p>
          <img
            class="city__down-arrow"
            src="assets/img/down_arrow_icon.svg"
            alt="down-arrow">
        </div>

        <Offices :city="city" ref="offices"></Offices>
      </div>
    </div>

  </aside>
</template>

<style scoped>
.sidebar {
  width: 26.5%;
  height: 100vh;
}

.city {
  width: 100%;

  border-bottom: 1px solid var(--light-grey-color);
}

.city:first-child {
  border-top: 1px solid var(--light-grey-color);
}

.city__title {
  height: 70px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.city__down-arrow {
  width: 15px;

  margin: 0 10% 0 0;
}

.city__name {
  margin: 0 0 0 7%;

  color: var(--indigo-color);
}
</style>


<script>
// State
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';

// Components
import Offices from '@components/Offices';

export default {
  components: {
    Offices,
  },

  computed: {
    ...mapState({
      map: state => state.map
    }),

    ...mapGetters([
      'countryFilter'
    ]),
  },

  methods: {
    ...mapMutations([
      'SET_COUNTRY'
    ]),

    changeCountry(event) {
      let country = event.target.value;
      this.SET_COUNTRY(country);
    },

    toggleOffices(city) {
      let offices = this.$refs.offices.find((item) => item.city.name == city);
      offices.state.isOpen = !offices.state.isOpen;
    },
  },
}
</script>
