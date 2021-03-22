import ApiService from "@/services/api.service";
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const UtilisateurModule = {
    namespaced: true,
    state: {
        utilisateurs: [],
        utilisateursLoadingStatus: false,

        adresse: null
    },
    getters: {
        utilisateur: state => username => {
            return state.utilisateurs.find(utilisateur => utilisateur.username === username)
        },
        utilisateurs: state => state.utilisateurs,
        utilisateursLoadingStatus: state => state.utilisateursLoadingStatus
    },
    mutations: {
        LOAD_UTILISATEURS_SUCCESS(state, utilisateurs) {
            state.utilisateurs = utilisateurs
        },
        LOAD_UTILISATEURS_FAILURE(state) {
            state.utilisateurs = []
        },
        UTILISATEURS_LOADING_STATUS(state, utilisateursLoadingStatus) {
            state.utilisateursLoadingStatus = utilisateursLoadingStatus
        },
        UPDATE_UTILISATEUR(state, utilisateur) {
            const index = state.utilisateurs.findIndex(u => u.id === utilisateur.id)
            if (index !== -1) {
                state.utilisateurs.splice(index, 1, utilisateur)
            }
        },
        LOAD_UTILISATEUR_ADRESSE_SUCCES(state, adresse) {
            state.adresse = adresse
        },
        LOAD_UTILISATEUR_ADRESSE_FAILURE(state) {
            state.adresse = null
        }
    },
    actions: {
        loadUtilisateurs: function({commit}) {
            let endpoint = `${DOMAIN}/utilisateurs/`;
            return new Promise((resolve, reject) => {
                commit('UTILISATEURS_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('LOAD_UTILISATEURS_SUCCESS', r.data)
                    commit('UTILISATEURS_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_UTILISATEURS_FAILURE')
                    commit('UTILISATEURS_LOADING_STATUS', false)
                    reject(error)
                })
            })
        },

        loadAdresseByUsername: function({commit}, username) {
            let endpoint = `${DOMAIN}/utilisateurs/${username}/adresses/`;
            return new Promise((resolve, reject) => {
                ApiService.GETData(endpoint).then(r => {
                    commit('LOAD_UTILISATEURS_SUCCESS', r.data)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_UTILISATEURS_FAILURE')
                    reject(error)
                })
            })
        }
    }
}