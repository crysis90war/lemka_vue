import ApiService from "@/services";
import CharacteristicModel from "@/models/characteristic.model";

export const CharacteristicModule = {
    namespaced: true,
    state: {
        characteristics: [],
        loadingStatus: false
    },
    getters: {
        characteristic: state => id => {
            return state.characteristics.find(item => item.id === id)
        },
        characteristics: state => state.characteristics,
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        LOAD_CARACTERISTICS_SUCCESS(state, characteristics) {
            state.characteristics = characteristics
        },
        LOAD_CARACTERISTICS_FAILURE(state) {
            state.characteristics = []
        },
        LOADING_STATUS(state, newLoadingStatus) {
            state.loadingStatus = newLoadingStatus
        },
        ADD_CHARACTERISTIC(state, characteristic) {
            state.characteristics.push(characteristic)
        },
        UPDATE_CARACTERISTIC(state, characteristic) {
            const index = state.characteristics.findIndex(item => item.id === characteristic.id)
            if (index !== -1) {
                state.characteristics.splice(index, 1, characteristic)
            }
        },
        DELETE_CHARACTERISTIC(state, characteristic) {
            const index = state.characteristics.map(item => item.id).indexOf(characteristic.id)
            if (index !== -1) {
                state.characteristics.splice(index, 1)
            }
        }
    },
    actions: {
        loadCharacteristics: function({commit}) {
            return new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.Characteristics.getCharacteristics().then(res => {
                    commit('LOAD_CARACTERISTICS_SUCCESS', res.data)
                    commit('LOADING_STATUS', false)
                    resolve(res)
                }, error => {
                    commit('LOAD_CARACTERISTICS_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createCharacteristic: function({commit}, payload) {
            return new Promise((resolve, reject) => {
                ApiService.Characteristics.postCharacteristic(payload).then(res => {
                    commit('ADD_CHARACTERISTIC', Object.assign(new CharacteristicModel(), res.data))
                    resolve(res)
                }, error => {
                    reject(error)
                })
            })
        },
        updateCharacteristic: function({commit}, payload) {
            return new Promise((resolve, reject) => {
                ApiService.Characteristics.putCharacteristic(payload).then(res => {
                    commit('UPDATE_CARACTERISTIC', Object.assign(new CharacteristicModel(), res.data))
                    resolve(res)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteCharacteristic: function({commit}, characteristic) {
            return new Promise((resolve, reject) => {
                ApiService.Characteristics.deleteCharacteristic(characteristic.id).then(res => {
                    commit('DELETE_CHARACTERISTIC', characteristic)
                    resolve(res)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}