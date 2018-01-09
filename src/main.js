import Vue from 'vue'
import VueRest from 'vue-rest';
import App from './App.vue'

Vue.use(VueRest, {
  axiosOptions: {
    localStorageAuthorization: {
      tokenItem: 'Token',
      prefix: 'Token',
    },
  },
});

new Vue({
  el: '#app',
  render: h => h(App)
})
