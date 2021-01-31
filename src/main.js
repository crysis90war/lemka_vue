import '@morioh/v-lightbox/dist/lightbox.css';
import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/axios'
import './plugins/bootstrap-vue'
import App from './App.vue'
import i18n from './i18n'
import router from './router'
import titleMixin from "@/mixins/title.mixin";
import store from './store'
import "./vee-validate";
import vSelect from 'vue-select'
import Lightbox from '@morioh/v-lightbox';
import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

Vue.use(Lightbox)
Vue.use(VueSidebarMenu)
Vue.config.productionTip = false
Vue.component('v-pack-select', vSelect)
Vue.mixin(titleMixin)

new Vue({
    i18n,
    router,
    store,
    // vuetify,
    render: h => h(App)
}).$mount('#app')
