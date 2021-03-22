import TypeServiceModel from "@/models/type_service.model";
import ApiService from "@/services/api.service";
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const TypeServiceModule = {
    namespaced: true,
    state: {
        typeServices: [],
        typeServiceLoadingStatus: false
    },
    getters: {
        typeServices: state => state.typeServices,
        typeService: state => id => {
            return state.typeServices.find(typeService => typeService.id === id)
        },
        typeServiceLoadingStatus: state => state.typeServiceLoadingStatus
    },
    mutations: {
        LOAD_TYPE_SERVICES_SUCCESS(state, typeServices) {
            state.typeServices = typeServices
        },
        LOAD_TYPE_SERVICES_FAILURE(state) {
            state.typeServices = []
        },
        TYPE_SERVICE_LOADING_STATUS(state, typeServiceLoadingStatus) {
            state.typeServiceLoadingStatus = typeServiceLoadingStatus
        },
        ADD_TYPE_SERVICE(state, newTypeService) {
            state.typeServices.push(newTypeService)
        },
        UPDATE_TYPE_SERVICE(state, typeService) {
            const index = state.typeServices.findIndex(item => item.id === typeService.id)
            if (index !== -1) {
                state.typeServices.splice(index, 1, typeService)
            }
        },
        DELETE_TYPE_SERVICE(state, typeService) {
            const index = state.typeServices.findIndex(item => item.id === typeService.id)
            if (index !== -1) {
                state.typeServices.splice(index, 1)
            }
        }
    },
    actions: {
        loadTypeServices: function ({commit}) {
            let endpoint = `${DOMAIN}/types_services/`;
            return new Promise((resolve, reject) => {
                commit('TYPE_SERVICE_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('LOAD_TYPE_SERVICES_SUCCESS', r.data)
                    commit('TYPE_SERVICE_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_TYPE_SERVICES_FAILURE')
                    commit('TYPE_SERVICE_LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createTypeService: function ({commit}, payload) {
            let endpoint = `${DOMAIN}/types_services/`;
            return new Promise((resolve, reject) => {
                ApiService.POSTData(endpoint, payload).then(r => {
                    commit('ADD_TYPE_SERVICE', Object.assign(new TypeServiceModel(), r.data))
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
        updateTypeService: function ({commit}, payload) {
            let endpoint = `${DOMAIN}/types_services/${payload.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(res => {
                    commit('UPDATE_TYPE_SERVICE', Object.assign(new TypeServiceModel(), res.data))
                    resolve(res)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteTypeService: function ({commit}, typeService) {
            let endpoint = `${DOMAIN}/types_services/${typeService.id}/`;
            return new Promise((resolve, reject) => {
                ApiService.DELETEData(endpoint).then(r => {
                    commit('DELETE_TYPE_SERVICE', typeService)
                    resolve(r)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}