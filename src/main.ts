import './router/componentHooks';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/js/bootstrap.bundle.min"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"

Vue.config.productionTip = false

Vue.filter("capitalize", function (value: string) {
  if (!value) return '';
  value = value.toString().toLowerCase();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter("webify", function (value: string) {
  if (!value) return '';
  value = value.toLowerCase();

  if (value.startsWith("www.")) value = value.substr(4);
  if (!value.match(/^https?:\/\//)) value = "http://" + value;

  return value;
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
