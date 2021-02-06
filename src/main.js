import Vue from 'vue'
import '@babel/polyfill'
import App from './App.vue'
import i18n from './i18n'
import titleMixin from "@/mixins/title.mixin";
import store from './store'
import router from './router'
import vSelect from 'vue-select'
import 'mutationobserver-shim'
import './plugins/axios'
import './plugins/bootstrap-vue'
import "./vee-validate";
import Lightbox from '@morioh/v-lightbox';
import '@morioh/v-lightbox/dist/lightbox.css';

Vue.use(Lightbox)

Vue.config.productionTip = false
Vue.component('v-pack-select', vSelect)
Vue.mixin(titleMixin)

new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
