<template>
  <div
    class="city-title"
    :class="{ 'city-title--active': isActive }"
    @click="toggleOffices(city.name)"
    @mouseenter="isActive = !isActive"
    @mouseleave="isActive = !isActive">
    <p class="city-title__name" :class="{ 'city-title__name--active': isOpen }">
      {{ city.name }}
    </p>
    <img
      class="city-title__down-arrow"
      src="https://cdn.glitch.com/b2bae586-de3c-45ae-9813-5f8ba057f304%2Fdown_arrow_icon.svg?v=1632132881818"
      alt="down-arrow"
      v-if="!isOpen">
    <img
      class="city-title__up-arrow"
      src="https://cdn.glitch.com/b2bae586-de3c-45ae-9813-5f8ba057f304%2Fup_arrow_icon.svg?v=1632132881818"
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

.city-title--active {
  background: var(--light-grey-color);
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
      isActive: false,
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
