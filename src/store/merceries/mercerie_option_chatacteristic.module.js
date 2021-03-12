import ApiService from "@/services";
import MercerieOptionChatacteristicModel from "@/models/mercerie_option_chatacteristic.model";

export const MercerieOptionChatacteristicModule = {
    namespaced: true,
    state: {
        option_characteristics: [],
        loadingStatus: false
    },
    getters: {
        option_characteristic: state => id => {
            return state.option_characteristics.find(item => item.id === id)
        },
        option_characteristics: state => state.option_characteristics,
        loadingStatus: state => state.loadingStatus
    },
    mutations: {
        LOAD_OPTION_CHARACTERISTICS_SUCCESS(state, option_characteristics) {
            state.option_characteristics = option_characteristics
        },
        LOAD_OPTION_CHARACTERISTICS_FAILURE(state) {
            state.option_characteristics = []
        },
        LOADING_STATUS(state, newLoadingStatus) {
            state.loadingStatus = newLoadingStatus
        },
        ADD_OPTION_CHARACTERISTIC(state, option_characteristic) {
            state.option_characteristics.push(option_characteristic)
        },
        UPDATE_OPTION_CHARACTERISTIC(state, option_characteristic) {
            const index = state.option_characteristics.findIndex(item => item.id === option_characteristic.id)
            if (index !== -1) {
                state.option_characteristics.splice(index, 1, option_characteristic)
            }
        },
        DELETE_OPTION_CHARACTERISTIC(state, option_characteristic) {
            const index = state.option_characteristics.map(item => item.id).indexOf(option_characteristic.id)
            if (index !== -1) {
                state.option_characteristics.splice(index, 1)
            }
        }
    },
    actions: {
        loadMercerieOptionCaracteristiques: function({commit}, mercerie_option_id){
            return new Promise((resolve, reject) => {
                commit('LOADING_STATUS', true)
                ApiService.OptionCharacteristics.getMercerieOptionCharacteristics(mercerie_option_id).then(res => {
                    commit('LOAD_OPTION_CHARACTERISTICS_SUCCESS', res.data)
                    commit('LOADING_STATUS', false)
                    resolve(res)
                }, error => {
                    commit('LOAD_OPTION_CHARACTERISTICS_FAILURE')
                    commit('LOADING_STATUS', false)
                    reject(error)
                })
            })
        },
        createMercerieOptionCaracteristique: function({commit}, [mercerie_option_id, payload]) {
            return new Promise((resolve, reject) => {
                ApiService.OptionCharacteristics.postMercerieOptionCharacteristic(mercerie_option_id, payload).then(res => {
                    commit('ADD_OPTION_CHARACTERISTIC', Object.assign(new MercerieOptionChatacteristicModel(), res.data))
                    resolve(res)
                }, error => {
                    reject(error)
                })
            })
        },
        updateMercerieOptionCaracteristique: function({commit}, [mercerie_option_id, payload]) {
            return new Promise((resolve, reject) => {
                ApiService.OptionCharacteristics.putMercerieOptionCharacteristic(mercerie_option_id, payload).then(res => {
                    commit('UPDATE_OPTION_CHARACTERISTIC', Object.assign(new MercerieOptionChatacteristicModel(), res.data))
                    resolve(res)
                }, error => {
                    reject(error)
                })
            })
        },
        deleteMercerieOptionCaracteristique: function({commit}, [mercerie_option_id, caracteristic]) {
            return new Promise((resolve, reject) => {
                ApiService.OptionCharacteristics.deleteMercerieOptionCharacteristic(mercerie_option_id, caracteristic.id).then(res => {
                    commit('DELETE_OPTION_CHARACTERISTIC', caracteristic)
                    resolve(res)
                }, error => {
                    reject(error)
                })
            })
        }
    }
}