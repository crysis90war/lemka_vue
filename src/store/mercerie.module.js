import ApiService from "@/services/api.service";
import LemkaHelpers from "@/helpers";
import MercerieModel from "@/models/mercerie/mercerie.model";
import MercerieOptionModel from "@/models/mercerie/mercerie_option.model";
import MercerieOptionChatacteristicModel from "@/models/mercerie/mercerie_option_chatacteristic.model";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const MercerieModule = {
    namespaced: true,
    state: {
        merceries: [],
        merceriesLoadingStatus: false,

        options: [],
        optionsLoadingStatus: false,

        caracteristiques: [],
        caracteristiquesLoadingStatus: false,

        globalMerceries: [],
        globalMerceriesLoadingStatus: false,
    },
    getters: {
        merceries: state => state.merceries,
        mercerie: state => id => {
            return state.merceries.find(item => item.id === id)
        },
        merceriesLoadingStatus: state => state.merceriesLoadingStatus,

        options: state => state.options,
        option: state => id => {
            return state.options.find(item => item.id === id)
        },
        optionsLoadingStatus: state => state.optionsLoadingStatus,

        caracteristiques: state => state.caracteristiques,
        caracteristique: state => id => {
            return state.caracteristiques.find(item => item.id === id)
        },
        caracteristiquesLoadingStatus: state => state.caracteristiquesLoadingStatus,

        globalMerceries: state => state.globalMerceries,
        globalMercerie: state => id => {
            return state.globalMerceries.find(item => item.id === id)
        },
        globalMerceriesLoadingStatus: state => state.globalMerceriesLoadingStatus,
    },
    mutations: {
        // region Merceries

        LOAD_MERCERIES_SUCCESS(state, merceries) {
            state.merceries = merceries
        },
        LOAD_MERCERIES_FAILURE(state) {
            state.merceries = []
        },
        MERCERIES_LOADING_STATUS(state, merceriesLoadingStatus) {
            state.merceriesLoadingStatus = merceriesLoadingStatus
        },
        ADD_MERCERIE(state, mercerie) {
            state.merceries.push(mercerie)
        },
        UPDATE_MERCERIE(state, mercerie) {
            const index = state.merceries.findIndex(item => item.id === mercerie.id)
            if (index !== -1) {
                state.merceries.splice(index, 1, mercerie)
            }
        },
        DELETE_MERCERIE(state, mercerie) {
            const index = state.merceries.map(item => item.id).indexOf(mercerie.id)
            if (index !== -1) {
                state.merceries.splice(index, 1)
            }
        },

        // endregion
        //region Options

        LOAD_OPTIONS_SUCCESS(state, options) {
            state.options = options
        },
        LOAD_OPTIONS_FAILURE(state) {
            state.options = []
        },
        OPTIONS_LOADING_STATUS(state, optionsLoadingStatus) {
            state.optionsLoadingStatus = optionsLoadingStatus
        },
        ADD_OPTION(state, option) {
            state.options.push(option)
        },
        UPDATE_OPTION(state, option) {
            const index = state.options.findIndex(item => item.id === option.id)
            if (index !== -1) {
                state.options.splice(index, 1, option)
            }
        },
        DELETE_OPTION(state, option) {
            const index = state.options.map(item => item.id).indexOf(option.id)
            if (index !== -1) {
                state.options.splice(index, 1)
            }
        },

        // endregion
        // region Caractéristiques

        LOAD_CARACTERISTIQUES_SUCCESS(state, caracteristiques) {
            state.caracteristiques = caracteristiques
        },
        LOAD_CARACTERISTIQUES_FAILURE(state) {
            state.caracteristiques = []
        },
        CARACTERISTIQUES_LOADING_STATUS(state, caracteristiquesLoadingStatus) {
            state.caracteristiquesLoadingStatus = caracteristiquesLoadingStatus
        },
        ADD_CARACTERISTIQUE(state, caracteristique) {
            state.caracteristiques.push(caracteristique)
        },
        UPDATE_CARACTERISTIQUE(state, caracteristique) {
            const index = state.caracteristiques.findIndex(item => item.id === caracteristique.id)
            if (index !== -1) {
                state.caracteristiques.splice(index, 1, caracteristique)
            }
        },
        DELETE_CARACTERISTIQUE(state, caracteristique) {
            const index = state.caracteristiques.map(item => item.id).indexOf(caracteristique.id)
            if (index !== -1) {
                state.caracteristiques.splice(index, 1)
            }
        },

        // endregion
        // region Global Merceries

        SET_GLOBAL_MERCERIES_SUCCESS(state, payload) {
            state.globalMerceries = payload
        },
        SET_GLOBAL_MERCERIES_FAILURE(state) {
            state.globalMerceries = []
        },
        SET_GLOBAL_MERCERIES_LOADING_STATUS(state, loadingStatus) {
            state.globalMerceriesLoadingStatus = loadingStatus
        }

        // endregion
    },
    actions: {
        // region Merceries

        loadMerceries: function ({commit}) {
            let endpoint = `${DOMAIN}/merceries/`;
            return new Promise((resolve, reject) => {
                commit('MERCERIES_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('LOAD_MERCERIES_SUCCESS', r.data)
                    commit('MERCERIES_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_MERCERIES_FAILURE')
                    commit('MERCERIES_LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createMercerie: function ({commit}, payload) {
            let endpoint = `${DOMAIN}/merceries/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_MERCERIE', Object.assign(new MercerieModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateMercerie: function ({commit}, payload) {
            let endpoint = `${DOMAIN}/merceries/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_MERCERIE', Object.assign(new MercerieModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteMercerie: function ({commit}, mercerie) {
            let endpoint = `${DOMAIN}/merceries/${mercerie.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_MERCERIE', mercerie)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        },

        // endregion
        // region Options

        loadOptions: function ({commit}, mercerie_id) {
            let endpoint = `${DOMAIN}/merceries/${mercerie_id}/options/`;
            return new Promise((resolve, reject) => {
                commit('OPTIONS_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('LOAD_OPTIONS_SUCCESS', r.data)
                    commit('OPTIONS_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_OPTIONS_FAILURE')
                    commit('OPTIONS_LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createOption: function ({commit}, [mercerie_id, payload]) {
            let endpoint = `${DOMAIN}/merceries/${mercerie_id}/options/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_OPTION', Object.assign(new MercerieOptionModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateOption: function ({commit}, [mercerie_id, payload]) {
            let endpoint = `${DOMAIN}/merceries/${mercerie_id}/options/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_OPTION', Object.assign(new MercerieOptionModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteOption: function ({commit}, [mercerie_id, option]) {
            let endpoint = `${DOMAIN}/merceries/${mercerie_id}/options/${option.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_OPTION', option)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        },

        // endregion
        // region Caractéristiques

        loadCaracteristiques: function ({commit}, option_id) {
            let endpoint = `${DOMAIN}/mercerie_options/${option_id}/caracteristiques/`;
            return new Promise((resolve, reject) => {
                commit('CARACTERISTIQUES_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('LOAD_CARACTERISTIQUES_SUCCESS', r.data)
                    commit('CARACTERISTIQUES_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_CARACTERISTIQUES_FAILURE')
                    commit('CARACTERISTIQUES_LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createCaracteristique: function ({commit}, [option_id, payload]) {
            let endpoint = `${DOMAIN}/mercerie_options/${option_id}/caracteristiques/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_CARACTERISTIQUE', Object.assign(new MercerieOptionChatacteristicModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateCaracteristique: function ({commit}, [option_id, payload]) {
            let endpoint = `${DOMAIN}/mercerie_options/${option_id}/caracteristiques/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_CARACTERISTIQUE', Object.assign(new MercerieOptionChatacteristicModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteCaracteristique: function ({commit}, [option_id, caracteristique]) {
            let endpoint = `${DOMAIN}/mercerie_options/${option_id}/caracteristiques/${caracteristique.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_CARACTERISTIQUE', caracteristique)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        },

        // endregion
        // region Global Merceries

        loadGlobalMercerieOptions: function ({commit}, searchField = "") {
            let searchParam = `?search=${searchField}`;
            let endpoint = `${DOMAIN}/public/merceries/${searchField === "" ? searchField : searchParam}`;
            return new Promise((resolve, reject) => {
                commit('SET_GLOBAL_MERCERIES_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_GLOBAL_MERCERIES_SUCCESS', r.data)
                    commit('SET_GLOBAL_MERCERIES_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_GLOBAL_MERCERIES_FAILURE')
                    commit('SET_GLOBAL_MERCERIES_LOADING_STATUS', false)
                    reject(error)
                })
            })
        }

        // endregion
    }
}