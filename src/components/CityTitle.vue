<template>
  <div class="city-title" @click="toggleOffices(city.name)">
    <p class="city-title__name" :class="{ 'city-title__name--active': isOpen }">
      {{ city.name }}
    </p>
    <img
      class="city-title__down-arrow"
      src="assets/img/down_arrow_icon.svg"
      alt="down-arrow"
      v-if="!isOpen">
    <img
      class="city-title__up-arrow"
      src="assets/img/up_arrow_icon.svg"
      alt="up-arrow"
      v-else>
  </div>
</template>

<style scoped>
.city-title {
  height: 70px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.city-title__name {
  margin: 0 0 0 7%;

  font-family: 'bold', Arial, Helvetica, sans-serif;
  font-size: 18px;

  color: var(--indigo-color);
}

.city-title__down-arrow,
.city-title__up-arrow {
  width: 15px;

  margin: 0 10% 0 0;
}

.city-title__name--active {
  color: var(--orange-color);
}
</style>

<script>
export default {
  props: {
    city: {
      type: Object
    },
  },

  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    toggleOffices(city) {
      this.isOpen = !this.isOpen;
      this.$parent.toggleOffices(city);
    },
  },
}
</script>
