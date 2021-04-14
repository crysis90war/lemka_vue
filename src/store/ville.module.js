import LemkaHelpers from "@/helpers";
import ApiService from "@/services/api.service";
import VilleModel from "@/models/pays/ville.model";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const VilleModule = {
    namespaced: true,
    state: {
        villes: [],
        city: null,
        loadingStatus: false
    },
    getters: {
        villes: state => state.villes,
        ville: state => id => {
            return state.villes.find(item => item.id === id)
        },
        city: state => state.city,
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        SET_VILLES_SUCCESS(state, villes) {
            state.villes = villes
        },
        SET_VILLES_FAILURE(state) {
            state.villes = []
        },
        LOADING_STATUS(state, loadingStatus) {
            state.loadingStatus = loadingStatus
        },
        LOAD_CITY(state, city) {
            state.city = city
        },
        ADD_VILLE(state, ville) {
            state.villes.push(ville)
        },
        UPDATE_VILLE(state, ville) {
            const index = state.villes.findIndex(item => item.id === ville.id)
            if (index !== -1) {
                state.villes.splice(index, 1, ville)
            }
        },
        DELETE_VILLE(state, ville) {
            const index = state.villes.map(item => item.id).indexOf(ville.id)
            if (index !== -1) {
                state.villes.splice(index, 1)
            }
        }
    },
    actions: {
        loadVilles({commit}, searchField = "") {
            let searchParam = `?search=${searchField}`;
            let endpoint = `${DOMAIN}/villes/${searchField === "" ? searchField : searchParam}`;
            return new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_VILLES_SUCCESS', r.data.results)
                    commit('LOADING_STATUS', false)
                    resolve(r.data.results)
                }, error => {
                    commit('SET_VILLES_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createVille({commit}, payload) {
            let endpoint = `${DOMAIN}/villes/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_VILLE', Object.assign(new VilleModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        loadCity({commit}, city_id) {
            let endpoint = `${DOMAIN}/villes/${city_id}/`;
            return new Promise((resolve, reject) => {
                ApiService.GETData(endpoint).then(r => {
                    commit('LOAD_CITY', Object.assign(new VilleModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateVille({commit}, payload) {
            let endpoint = `${DOMAIN}/villes/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_VILLE', Object.assign(new VilleModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteVille({commit}, ville) {
            let endpoint = `${DOMAIN}/villes/${ville.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_VILLE', ville)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}