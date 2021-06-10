import ApiService from "@/services/api.service";
import PaysModel from "@/models/adresse/pays.model";

export const PaysModule = {
    namespaced: true,
    state: {
        countries: [],
        countriesLoadingStatus: false,
        pays: null
    },
    getters: {
        countries: state => state.countries,
        country: state => id => {
            return state.countries.find(item => item.id === id)
        },
        countriesLoadingStatus: state => state.countriesLoadingStatus,
        pays: state => state.pays
    },
    mutations: {
        LOAD_COUNTRIES_SUCCESS(state, countries) {
            state.countries = countries
        },
        LOAD_COUNTRIES_FAILURE(state) {
            state.countries = []
        },
        COUNTRIES_LOADING_STATUS(state, countriesLoadingStatus) {
            state.countriesLoadingStatus = countriesLoadingStatus
        },
        LOAD_PAYS(state, pays) {
            state.pays = pays
        },
        ADD_COUNTRY(state, country) {
            state.countries.push(country)
        },
        UPDATE_COUNTRY(state, country) {
            const index = state.countries.findIndex(item => item.id === country.id)
            if (index !== -1) {
                state.countries.splice(index, 1, country)
            }
        },
        DELETE_COUNTRY(state, country) {
            const index = state.countries.map(item => item.id).indexOf(country.id)
            if (index !== -1) {
                state.countries.splice(index, 1)
            }
        }
    },
    actions: {
        loadCountries({commit}) {
            let endpoint = `pays/`;
            return new Promise((resolve, reject) => {
                commit('COUNTRIES_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('LOAD_COUNTRIES_SUCCESS', r.data)
                    commit('COUNTRIES_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_COUNTRIES_FAILURE')
                    commit('COUNTRIES_LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createCountry({commit}, payload) {
            let endpoint = `pays/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_COUNTRY', Object.assign(new PaysModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        loadPays({commit}, pays_id) {
            let endpoint = `pays/${pays_id}/`;
            return new Promise((resolve, reject) => {
                ApiService.GETData(endpoint).then(r => {
                    commit('LOAD_PAYS', Object.assign(new PaysModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateCountry({commit}, payload) {
            let endpoint = `pays/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_COUNTRY', Object.assign(new PaysModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteCountry({commit}, country) {
            let endpoint = `pays/${country.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_COUNTRY', country)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}