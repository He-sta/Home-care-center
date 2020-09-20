import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/style/layout.css'
import 'babel-polyfill'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)


Vue.use(ElementUI)
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

