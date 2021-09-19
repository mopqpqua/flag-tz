<template>
  <aside class="sidebar">

    <div class="control">
      <button
        class="button control__button"
        :class="{ 'control__button--active': currentCountry == 'Белоруссия' }"
        :disabled="!apiReady"
        @click="changeCountry"
        value="Белоруссия">Белоруссия</button>
      <button
        class="button control__button"
        :class="{ 'control__button--active': currentCountry == 'Россия' }"
        :disabled="!apiReady"
        @click="changeCountry"
        value="Россия">Россия</button>
    </div>

    <div class="cities-list" v-if="countryFilter">
      <div
        class="city"
        v-for="city in countryFilter.cities" :key="city.name">
        <CityTitle :city="city"></CityTitle>
        <Offices :city="city" ref="offices"></Offices>
      </div>
    </div>

  </aside>
</template>

<style scoped>
.sidebar {
  width: 26.5%;
  height: 100vh;

  overflow-y: scroll;
}

/* Hide scrollbar */
.sidebar::-webkit-scrollbar {
  width: 1px;
}


/* Button start */
.button {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  border-radius: 0;
}
/* Button end */


/* Control start */
.control {
  height: 35px;

  margin: 0 0 24px 0;

  display: flex;
  justify-content: space-between;
}

.control__button {
  width: 49.98%;

  background: #FFF;
  border: 1px solid var(--grey-color);

  color: var(--grey-color);
}

.control__button:disabled {
  background: var(--light-grey-color);
  color: #FFF;
}

.control__button:hover {
  background: var(--orange-color);

  color: #FFF;
}

.control__button--active {
  background: var(--orange-color);
  border: none;

  color: #FFF
}
/* Control end */


/* City start */
.city {
  width: 100%;

  border-bottom: 1px solid var(--light-grey-color);
}

.city:first-child {
  border-top: 1px solid var(--light-grey-color);
}
/* City end */
</style>


<script>
// State
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';

// Components
import CityTitle from '@components/CityTitle';
import Offices from '@components/Offices';

export default {
  components: {
    CityTitle,
    Offices,
  },

  computed: {
    ...mapState({
      map: state => state.map,
      currentCountry: state => state.currentCountry,
      apiReady: state => state.condition.apiReady,
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
