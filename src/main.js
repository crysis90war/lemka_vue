import Vue from 'vue'
import App from './App.vue'
import i18n from './i18n'
import store from './store'
import router from './router'
import '@babel/polyfill'
import 'mutationobserver-shim'
import './plugins/axios'
import './plugins/bootstrap-vue'
import "./vee-validate";
// import Vuelidate from "vuelidate/src";
import titleMixin from "@/mixins/title.mixin";

import Lightbox from '@morioh/v-lightbox';
import '@morioh/v-lightbox/dist/lightbox.css';
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

Vue.config.productionTip = false
Vue.component('multiselect', Multiselect)
// Vue.use(Vuelidate)
Vue.use(Lightbox)
Vue.mixin(titleMixin)

new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
