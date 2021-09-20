<template>
  <main class="app">
    <Sidebar></Sidebar>
    <Map></Map>
  </main>
</template>

<style scoped>
/* Импорты */
@import url('css/fonts.css');
@import url('css/vars.css');

.app {
  width: 100%;
  height: 100vh;

  display: flex;
}
</style>

<script>
// Состояние
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

// Компоненты
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
    // Следит за сменой страны
    // и изменяет кластеризатор
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

      /*
      * Если выборки для объектов в mapObjects
      * не существует
      * то мы создадим их
      */
      if (!this.checkQueries()) {
        query = ymaps.geoQuery(this.makeQuery());
        this.geoQueries[this.currentCountry] = query;

        // Добавляем каждый объект выборки
        // на карту...
        query.addToMap(map);

        // ...и затем скрываем
        query.each(function(placemark) {
          placemark.options.set('visible', false);
        });
      } else {
        query = this.geoQueries[this.currentCountry];
      }

      // Обновляем кластеризатор
      this.updateClusterer();

      // Добавляем его на карту и центрируемся
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
        // Отключаем стандартное поведение при клике
        // на маркер чтобы управлять им самим
        openBalloonOnClick: false,
        preset: 'islands#nightCircleIcon',
        balloonContentLayout: this.styles.balloonLayout,
      }];
    },

    makeQuery() {
      let storage = [];

      for (let object of this.mapObjects) {
        let placemark = new ymaps.Placemark(...this.makePlacemark(object));

        // В модель объекта добавляем placemark,
        // чтобы в будущем открыть его балун
        object.placemark = placemark;

        storage.push(placemark);
      }

      return storage;
    },

    updateClusterer() {
      // Чистим кластеризатор...
      this.map.clusterer.removeAll();

      // ...и добавляем туда новые объекты
      for (let object of this.mapObjects) {
        let placemark = new ymaps.Placemark(...this.makePlacemark(object));

        // Событие клика, при котором карта
        // будет центрироваться
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

      // Проверяем наличие в geoQueries текущей страны
      for (let country in this.geoQueries) {
        if (result) continue;
        result = this.currentCountry == country;
      }

      return result;
    },

    centerClusterer(clusterer) {
      // Центрируемся на текущих объектах
      // в кластеризаторе
      this.map.setBounds(clusterer.getBounds());
    },
  },
}
</script>
