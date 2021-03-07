import MensurationModel from "@/models/mensuration.model";

export const mensurationModule = {
    namespaced: true,
    state: {
        mensurations: [],
        loadingStatus: false
    },
    getters: {
        mensuration: state => id => {
            return state.mensurations.find(mensuration => mensuration.id === id)
        },
        mensurations: state => state.mensurations,
        loadingStatus: state => state.loadingStatus,
    },
    mutations: {
        LOAD_MENSURATIONS_SUCCESS(state, mensurations) {
            state.mensurations = mensurations
        },
        LOAD_MENSURATIONS_FAILURE(state) {
            state.mensurations = []
        },
        LOADING_STATUS(state, newLoadingStatus) {
            state.loadingStatus = newLoadingStatus
        },
        ADD_MENSURATION(state, newMensuration) {
            state.mensurations.push(newMensuration)
        },
        UPDATE_MENSURATION(state, mensuration) {
            const index = state.mensurations.findIndex(c => c.id === mensuration.id)
            if (index !== -1) {
                state.mensurations.splice(index, 1, mensuration)
            }
        },
        DELETE_MENSURATION(state, mensuration) {
            const index = state.mensurations.findIndex(c => c.id === mensuration.id)
            if (index !== -1) {
                state.mensurations.splice(index, 1)
            }
        }
    },
    actions: {
        loadMensurations: async function ({commit}) {
            try {
                commit('LOADING_STATUS', true)
                let mensurations = await MensurationModel.fetchMensurations()
                commit('LOAD_MENSURATIONS_SUCCESS', mensurations)
                commit('LOADING_STATUS', false)
                return Promise.resolve(mensurations)
            } catch (e) {
                commit('LOAD_MENSURATIONS_FAILURE')
                commit('LOADING_STATUS', false)
                return Promise.reject(e)
            }
        },
        createMensuration: async function ({commit}, payload) {
            try {
                let mensuration = await MensurationModel.createMensuration(payload)
                commit('ADD_MENSURATION', mensuration)
                return Promise.resolve(mensuration)
            } catch (e) {
                return Promise.reject(e)
            }
        },
        updateMensuration: async function({commit}, mensuration) {
            try {
                commit('UPDATE_MENSURATION', mensuration)
            } catch (e) {
                return Promise.reject(e)
            }
        },
        deleteMensuration: async function({commit}, mensuration) {
            try {
                await MensurationModel.deleteMensuration(mensuration.id)
                commit('DELETE_MENSURATION', mensuration)
            } catch (e) {
                return Promise.reject(e)
            }
        }
    }
}