import Vue from 'vue'
import Vuex from 'vuex'
import apps from './apps'
import axios from './axios'
import errors from './errors'

Vue.use(Vuex)

export default {
    apps,
    axios,
    errors,
}