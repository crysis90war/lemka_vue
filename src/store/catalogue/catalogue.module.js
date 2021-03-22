import LemkaHelpers from "@/helpers";
import ApiService from "@/services/api.service";
import CatalogueModel from "@/models/catalogue/catalogue.model";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const CatalogueModule = {
    namespaced: true,
    state: {
        catalogues: [],
        cataloguesLoadingStatus: false
    },
    getters: {
        catalogues: state => state.catalogues,
        catalogue: state => id => {
            return state.catalogues.find(item => item.id === id)
        },
        cataloguesLoadingStatus: state => state.cataloguesLoadingStatus
    },
    mutations: {
        LOAD_CATALOGUES_SUCCESS(state, catalogues) {
            state.catalogues = catalogues
        },
        LOAD_CATALOGUES_FAILURE(state) {
            state.catalogues = []
        },
        CATALOGUES_LOADING_STATUS(state, cataloguesLoadingStatus) {
            state.cataloguesLoadingStatus = cataloguesLoadingStatus
        },
        ADD_CATALOGUE(state, catalogue) {
            state.catalogues.push(catalogue)
        },
        UPDATE_CATALOGUE(state, catalogue) {
            const index = state.catalogues.findIndex(item => item.id === catalogue.id)
            if (index !== -1) {
                state.catalogues.splice(index, 1, catalogue)
            }
        },
        DELETE_CATALOGUE(state, catalogue) {
            const index = state.catalogues.map(item => item.id).indexOf(catalogue.id)
            if (index !== -1) {
                state.catalogue.space(index, 1)
            }
        }
    },
    actions: {
        loadCatalogues: function ({commit}) {
            let endpoint = `${DOMAIN}/catalogues/`;
            return new Promise((resolve, reject) => {
                commit('CATALOGUES_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('LOAD_CATALOGUES_SUCCESS', r.data)
                    commit('CATALOGUES_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_CATALOGUES_FAILURE')
                    commit('CATALOGUES_LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createCatalogue: function ({commit}, payload) {
            let endpoint = `${DOMAIN}/catalogues/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_CATALOGUE', Object.assign(new CatalogueModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateCatalogue: function({commit}, payload) {
            let endpoint = `${DOMAIN}/catalogues/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_CATALOGUE', Object.assign(new CatalogueModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteCatalogue: function({commit}, catalogue) {
            let endpoint = `${DOMAIN}/catalogues/${catalogue.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_CATALOGUE', catalogue)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}