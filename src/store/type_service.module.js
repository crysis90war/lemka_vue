import TypeServiceModel from "@/models/type_service.model";

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
        loadTypeService: async function ({commit}) {
            try {
                commit('LOADING_STATUS', true)
                let typeServices = await TypeServiceModel.fetchTypeServices()
                commit('LOAD_TYPE_SERVICES_SUCCESS', typeServices)
                commit('LOADING_STATUS', false)
                return Promise.resolve(typeServices)
            } catch (e) {
                commit('LOAD_TYPE_SERVICES_FAILURE')
                commit('LOADING_STATUS', false)
                return Promise.resolve(e)
            }
        },
        createTypeService: async function ({commit}, payload) {
            try {
                let typeService = await TypeServiceModel.createTypeService(payload)
                commit('ADD_TYPE_SERVICE', Object.assign(new TypeServiceModel(), typeService))
                return Promise.resolve(typeService)
            } catch (e) {
                return Promise.resolve(e)
            }
        },
        updateTypeService: async function ({commit}, payload) {
            try {
                let typeService = await TypeServiceModel.updateTypeService(payload)
                commit('UPDATE_TYPE_SERVICE', Object.assign(new TypeServiceModel(), typeService))
                return Promise.resolve(typeService)
            } catch (e) {
                return Promise.reject(e)
            }
        },
        deleteTypeService: async function ({commit}, typeService) {
            try {
                await TypeServiceModel.deleteTypeService(typeService.id)
                commit('DELETE_TYPE_SERVICE', typeService)
            } catch (e) {
                return Promise.reject(e)
            }
        }
    }
}