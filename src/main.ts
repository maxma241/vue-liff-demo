// @ts-ignore
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './router/guard'
import store from './store'
import VueCompositionApi from '@vue/composition-api';
import './quasar'

Vue.use(VueCompositionApi);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
