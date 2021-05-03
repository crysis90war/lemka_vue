import ApiService from "@/services/api.service";
import LemkaHelpers from "@/helpers";

const DOMAIN = LemkaHelpers.Endpoints.DOMAIN;

export const RendezVousModule = {
    namespaced: true,
    state: {
        available_hours: {
            message: "",
            available_hours: []
        }
    },
    getters: {
        available_hours: state => state.available_hours
    },
    mutations: {
        SET_AVAILABLE_HOURS_SUCCESS(state, payload) {
            state.available_hours = payload
        },
        SET_AVAILABLE_HOURS_FAILURE(state) {
            state.available_hours = {
                message: "",
                available_hours: []
            }
        }
    },
    actions: {
        loadHeuresDispo: async function({commit}, date) {
            let endpoint = `${DOMAIN}/profil/available-hours/${date}/`;
            return await new Promise((resolve, reject) => {
                ApiService.GETDatas(endpoint).then(r => {
                    commit('SET_AVAILABLE_HOURS_SUCCESS', r.data)
                    resolve(r.data)
                }, error => {
                    commit('SET_AVAILABLE_HOURS_FAILURE')
                    reject(error)
                })
            })
        }
    }
}