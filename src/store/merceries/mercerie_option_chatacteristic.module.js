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
        }
    }
}