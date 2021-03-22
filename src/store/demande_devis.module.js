import ApiService from "@/services/api.service";
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const DemandeDevisModule = {
    namespaced: true,
    state: {
        demandesDevis: [],
        demandesDevisLoadingStatus: false
    },
    getters: {
        demandeDevis: state => id => {
            return state.demandesDevis.find(item => item.id === id)
        },
        demandesDevis: state => state.demandesDevis,
        demandesDevisEnCours: state => {
            return state.demandesDevis.filter(item => item.est_soumis === true)
        },
        demandesDevisLoadingStatus: state => state.demandesDevisLoadingStatus
    },
    mutations: {
        LOAD_DEMANDES_DEVIS_SUCCESS(state, demandesDevis) {
            state.demandesDevis = demandesDevis
        },
        LOAD_DEMANDES_DEVIS_FAILURE(state) {
            state.demandesDevis = []
        },
        DEMANDE_DEVIS_LOADING_STATUS(state, demandesDevisLoadingStatus) {
            state.demandesDevisLoadingStatus = demandesDevisLoadingStatus
        },
        ADD_DEMANDE_DEVIS(state, demandeDevis) {
            state.demandesDevis.push(demandeDevis)
        },
        UPDATE_DEMANDE_DEVIS(state, demandeDevis) {
            const index = state.demandesDevis.findIndex(item => item.id === demandeDevis.id)
            if (index !== -1) {
                state.demandesDevis.splice(index, 1, demandeDevis)
            }
        },
        DELETE_DEMANDE_DEVIs(state, demandeDevis) {
            const index = state.demandesDevis.map(item => item.id).indexOf(demandeDevis.id)
            if (index !== -1) {
                state.demandesDevis.splice(index, 1)
            }
        }
    },
    actions: {
        loadDemandeDevis({commit}) {
            let endpoint = `${DOMAIN}/demandes_devis/`;
            return new Promise((resolve, reject) => {
                commit('DEMANDE_DEVIS_LOADING_STATUS', true)
                ApiService.GETDatas(endpoint).then(r => {
                    commit('LOAD_DEMANDES_DEVIS_SUCCESS', r.data)
                    commit('DEMANDE_DEVIS_LOADING_STATUS', false)
                    resolve(r.data)
                }, error => {
                    commit('LOAD_DEMANDES_DEVIS_FAILURE')
                    commit('DEMANDE_DEVIS_LOADING_STATUS', false)
                    reject(error)
                })
            })
        }
    }
}