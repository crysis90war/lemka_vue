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
        SET_CATALOGUES_SUCCESS(state, payload) {
            state.catalogues = payload
        },
        SET_CATALOGUES_FAILURE(state) {
            state.catalogues = []
        },
        CATALOGUES_LOADING_STATUS(state, cataloguesLoadingStatus) {
            state.cataloguesLoadingStatus = cataloguesLoadingStatus
        },
        ADD_CATALOGUE(state, payload) {
            state.catalogues.push(payload)
        },
        UPDATE_CATALOGUE(state, payload) {
            const index = state.catalogues.findIndex(item => item.id === payload.id)
            if (index !== -1) {
                state.catalogues.splice(index, 1, payload)
            }
        },
        DELETE_CATALOGUE(state, catalogue) {
            const index = state.catalogues.map(item => item.id).indexOf(catalogue.id)
            if (index !== -1) {
                state.catalogue.splice(index, 1)
            }
        }
    },
    actions: {
        loadCatalogues: async function ({commit}, searchField = "") {
            let searchParam = `?search=${searchField}`;
            let endpoint = `${DOMAIN}/catalogues/${searchField === "" ? searchField : searchParam}`;
            return await new Promise((resolve, reject) => {
                commit('CATALOGUES_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_CATALOGUES_SUCCESS', r.data)
                    commit('CATALOGUES_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_CATALOGUES_FAILURE')
                    commit('CATALOGUES_LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createCatalogue: async function ({commit}, payload) {
            let endpoint = `${DOMAIN}/catalogues/`;
            return await new Promise((resolve, reject) => {
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