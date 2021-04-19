import ApiService from "@/services/api.service";
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const UtilisateurModule = {
    namespaced: true,
    state: {
        utilisateurs: [],
        loadingStatus: false,
    },
    getters: {
        utilisateur: state => username => {
            return state.utilisateurs.find(utilisateur => utilisateur.username === username)
        },
        utilisateurs: state => state.utilisateurs,
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        SET_UTILISATEURS_SUCCESS(state, payload) {
            state.utilisateurs = payload
        },
        SET_UTILISATEURS_FAILURE(state) {
            state.utilisateurs = []
        },
        LOADING_STATUS(state, loadingStatus) {
            state.loadingStatus = loadingStatus
        },
        UPDATE_UTILISATEUR(state, payload) {
            const index = state.utilisateurs.findIndex(item => item.id === payload.id)
            if (index !== -1) {
                state.utilisateurs.splice(index, 1, payload)
            }
        }
    },
    actions: {
        loadUtilisateurs: async function ({commit}) {
            let endpoint = `${DOMAIN}/utilisateurs/`;
            return await new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_UTILISATEURS_SUCCESS', r.data)
                    commit('LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('SET_UTILISATEURS_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        updateUtilisateur: function ({commit}, payload) {
            let endpoint = `${DOMAIN}/utilisateurs/${payload.username}/`;
            return new Promise((resolve, reject) => {
                ApiService.PUTData(endpoint, payload).then(r => {
                    commit('UPDATE_UTILISATEUR', r.data)
                    resolve(r.data)
                }, error => {
                    reject(error)
                })
            })
        },
    }
}