import axios from "axios";
import authHeader from "@/services/auth-header";
import {Endpoints} from "@/helpers/enums.helper";

export const villes = {
    namespaced: true,
    state: {
        loadingStatus: 'notLoading',
        cities: []
    },
    mutations: {
        SET_LOADING_STATUS(state, status) {
            state.loadingStatus = status
        },
        SET_CITIES(state, cities) {
            state.cities = cities
        }
    },
    actions: {
        async fetchCities(context) {
            if (context.state.cities.length === 0) {
                context.commit('SET_LOADING_STATUS', 'loading')
                await axios.get(Endpoints.VILLES_ENDPOINT, {headers: authHeader()}).then(response => {
                    let villes = []
                    response.data.forEach(item => {
                        let ville = {}
                        ville.value = item.id
                        ville.label = `${item.ville} - ${item.code_postale}`
                        villes.push(ville)
                    })
                    context.commit('SET_LOADING_STATUS', 'notLoading')
                    context.commit('SET_CITIES', villes)
                })
            }
        }
    }
}