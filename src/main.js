import Vue from 'vue'
import App from './App.vue'
import i18n from './i18n'
import store from './store'
import router from './router'
import '@babel/polyfill'
import 'mutationobserver-shim'
import './plugins/axios'
import './plugins/bootstrap-vue'
import titleMixin from "@/mixins/title.mixin";
import Lightbox from '@morioh/v-lightbox';
import '@morioh/v-lightbox/dist/lightbox.css';
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import LSpinner from "@/components/LSpinner";
import LUploadModal from "@/components/LUploadModal";
import LInvalidFeedback from "@/components/LInvalidFeedback";
import LSeparateur from "@/components/LSeparateur";
import LCreateRefreshButtonGroup from "@/components/Table/LCreateRefresh";
import LTableBusy from "@/components/Table/LTableBusy";
import LTableEmpty from "@/components/Table/LTableEmpty";
import LTableEmptyFiltered from "@/components/Table/LTableEmptyFiltered";
import {Carousel3d, Slide} from 'vue-carousel-3d'
import LJumbotron from "@/components/LJumbotron";
import VueAnalytics from "vue-analytics";
// import {jwtInterceptor} from "@/helpers/jwt-interceptor";
// eslint-disable-next-line no-unused-vars
import {initFacebookSdk} from "@/helpers/init-facebook-sdk";

// jwtInterceptor();

Vue.config.productionTip = process.env.VUE_APP_NODE_END === 'development';

Vue.component('l-create-refresh', LCreateRefreshButtonGroup)
Vue.component('multiselect', Multiselect)
Vue.component('l-separateur', LSeparateur)
Vue.component('l-spinner', LSpinner)
Vue.component('l-upload-modal', LUploadModal)
Vue.component('l-invalid-feedback', LInvalidFeedback)
Vue.component('l-table-busy', LTableBusy)
Vue.component('l-table-empty', LTableEmpty)
Vue.component('l-table-empty-filtered', LTableEmptyFiltered)
Vue.component('l-carousel', Carousel3d)
Vue.component('l-slide', Slide)
Vue.component('l-jumbotron', LJumbotron)

// Vue.use(Vuelidate)
Vue.use(Lightbox)
Vue.use(VueAnalytics, {
    id: "UA-180100266-1",
    router
})
Vue.mixin(titleMixin)

//initFacebookSdk().then(startApp)

new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app')

// eslint-disable-next-line no-unused-vars
function startApp() {
    new Vue({
        i18n,
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
}

