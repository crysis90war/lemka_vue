export const fonctions = {
    data() {
        return {
            isLoading: false
        }
    },
    methods: {
        toggleModal: function(modal) {
            this.$refs[modal].toggle('#toggle-btn')
        },
        showModal: function (mondal_id) {
            this.$bvModal.show(mondal_id)
        },

        hideModal: function (mondal_id) {
            this.$bvModal.hide(mondal_id)
        },
        toggleLoading: function() {
            this.isLoading = !this.isLoading
        },
    }
}