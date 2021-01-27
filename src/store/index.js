import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from "@/store/auth.module";
import { villes } from "@/store/cities.module"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    villes
  }
});
