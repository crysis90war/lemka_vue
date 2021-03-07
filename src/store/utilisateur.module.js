import UtilisateurModel from "@/models/utilisateur.model";

export const utilisateurModule = {
    namespaced: true,
    state: {
        utilisateurs: [],
        loadingStatus: false
    },
    getters: {
        utilisateur: state => id => {
            return state.utilisateurs.find(utilisateur => utilisateur.id === id)
        },
        utilisateurs: state => state.utilisateurs,
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        LOAD_UTILISATEURS_SUCCESS(state, utilisateurs) {
            state.utilisateurs = utilisateurs
        },
        LOAD_UTILISATEURS_FAILURE(state) {
            state.utilisateurs = []
        },
        LOADING_STATUS(state, newLoadingStatus) {
            state.loadingStatus = newLoadingStatus
        },
        UPDATE_UTILISATEUR(state, utilisateur) {
            const index = state.utilisateurs.findIndex(u => u.id === utilisateur.id)
            if (index !== -1) {
                state.utilisateurs.splice(index, 1, utilisateur)
            }
        }
    },
    actions: {
        loadUtilisateurs: async function({commit}) {
            try {
                commit('LOADING_STATUS', true)
                let utilisateurs = await UtilisateurModel.fetchUtilisateurs()
                commit('LOAD_UTILISATEURS_SUCCESS', utilisateurs)
                commit('LOADING_STATUS', false)
                return Promise.resolve()
            } catch (e) {
                commit('LOAD_UTILISATEURS_FAILURE')
                commit('LOADING_STATUS', false)
                return Promise.reject(e)
            }
        },
        // eslint-disable-next-line no-unused-vars
        updateUtilisateur: async function({commit}, payload) {
            // try {
            //     let user = await UtilisateurModel.
            // } catch (e) {
            //     return Promise.reject(e)
            // }
        }
    }
}