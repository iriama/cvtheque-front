import './router/componentHooks';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/js/bootstrap.bundle.min"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import Meta from 'vue-meta';

Vue.use(Meta, {
  keyName: 'metaInfo', 
  attribute: 'data-vue-meta', 
  ssrAttribute: 'data-vue-meta-ssr', 
  tagIDKeyName: 'vmid'
});

Vue.config.productionTip = false

Vue.filter("capitalize", function (value: string) {
  if (!value) return '';
  value = value.toString().toLowerCase();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter("error", function (value: string) {

  if (value == "BLANK") return "Le champ ne doit pas être vide";
  if (value == "FORMAT") return "Format incorrect";
  if (value == "UNIQUE_EMAIL") return "Cette adresse est déjà utilisée";
  if (value.startsWith("MIN_")) return "La valeur doit être supérieure ou égale à " + value.split("_")[1];
  if (value.startsWith("MAX_")) return "La valeur doit être inférieure ou égale à " + value.split("_")[1];
  if (value.startsWith("LENGTH_")) {
    const s = value.split("_");
    return `La longueur doit être comprise entre ${s[1]} et ${s[2]} caractères`;
  }

  return "Invalide";
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
