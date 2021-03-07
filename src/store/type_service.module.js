import TypeServiceModel from "@/models/type_service.model";
import ApiService from "@/services";

export const typeServiceModule = {
    namespaced: true,
    state: {
        typeServices: [],
        loadingStatus: false
    },
    getters: {
        typeService: state => id => {
            return state.typeServices.find(typeService => typeService.id === id)
        },
        typeServices: state => state.typeServices,
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        LOAD_TYPE_SERVICES_SUCCESS(state, typeServices) {
            state.typeServices = typeServices
        },
        LOAD_TYPE_SERVICES_FAILURE(state) {
            state.typeServices = []
        },
        LOADING_STATUS(state, newLoadingStatus) {
            state.loadingStatus = newLoadingStatus
        },
        ADD_TYPE_SERVICE(state, newTypeService) {
            state.typeServices.push(newTypeService)
        },
        UPDATE_TYPE_SERVICE(state, typeService) {
            const index = state.typeServices.findIndex(ts => ts.id === typeService.id)
            if (index !== -1) {
                state.typeServices.splice(index, 1, typeService)
            }
        },
        DELETE_TYPE_SERVICE(state, typeService) {
            const index = state.typeServices.findIndex(ts => ts.id === typeService.id)
            if (index !== -1) {
                state.typeServices.splice(index, 1)
            }
        }
    },
    actions: {
        loadTypeService: function ({commit}) {
            return new Promise(((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.TypeService.getTypeServices().then(res => {
                    commit('LOAD_TYPE_SERVICES_SUCCESS', res.data)
                    commit('LOADING_STATUS', false)
                    resolve(res)
                }, error => {
                    commit('LOAD_TYPE_SERVICES_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            }))
        },
        createTypeService: function ({commit}, payload) {
            return new Promise(((resolve, reject) => {
                ApiService.TypeService.postTypeService(payload).then(res => {
                    commit('ADD_TYPE_SERVICE', Object.assign(new TypeServiceModel(), res.data))
                    resolve(res)
                }, error => {
                    reject(error)
                })
            }))
        },
        updateTypeService: function ({commit}, payload) {
            return new Promise(((resolve, reject) => {
                ApiService.TypeService.putTypeService(payload).then(res => {
                    commit('UPDATE_TYPE_SERVICE', Object.assign(new TypeServiceModel(), res.data))
                    resolve(res)
                }, error => {
                    reject(error)
                })
            }))
        },
        deleteTypeService: function ({commit}, typeService) {
            return new Promise(((resolve, reject) => {
                ApiService.TypeService.deleteTypeService(typeService.id).then(res => {
                    commit('DELETE_TYPE_SERVICE', typeService)
                    resolve(res)
                }, error => {
                    reject(error)
                })
            }))
        }
    }
}