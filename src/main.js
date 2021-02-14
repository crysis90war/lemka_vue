import Vue from 'vue'
import App from './App.vue'
import '@babel/polyfill'
import '@morioh/v-lightbox/dist/lightbox.css';
import 'vue-multiselect/dist/vue-multiselect.min.css'
import i18n from './i18n'
import titleMixin from "@/mixins/title.mixin";
import store from './store'
import router from './router'
import 'mutationobserver-shim'
import './plugins/axios'
import './plugins/bootstrap-vue'
import "./vee-validate";
import Lightbox from '@morioh/v-lightbox';
import Vuelidate from "vuelidate/src";
import Multiselect from 'vue-multiselect'


Vue.config.productionTip = false
Vue.component('multiselect', Multiselect)
Vue.use(Vuelidate)
Vue.use(Lightbox)
Vue.mixin(titleMixin)

new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
