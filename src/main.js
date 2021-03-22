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
import titleMixin from "@/mixins/title.mixin";
import Lightbox from '@morioh/v-lightbox';
import '@morioh/v-lightbox/dist/lightbox.css';
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import LSpinner from "@/components/LSpinner";
import LUploadModal from "@/components/LUploadModal";
import LInvalidFeedback from "@/components/LInvalidFeedback";
import LSeparateur from "@/components/LSeparateur";
import LCreateRefreshButtonGroup from "@/components/LCreateRefreshButtonGroup";

Vue.config.productionTip = false
Vue.component('l-create-refresh', LCreateRefreshButtonGroup)
Vue.component('multiselect', Multiselect)
Vue.component('l-separateur', LSeparateur)
Vue.component('l-spinner', LSpinner)
Vue.component('l-upload-modal', LUploadModal)
Vue.component('l-invalid-feedback', LInvalidFeedback)
// Vue.use(Vuelidate)
Vue.use(Lightbox)
Vue.mixin(titleMixin)

new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
