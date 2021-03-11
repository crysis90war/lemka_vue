export const fonctions = {
    methods: {
        toggleModal: function(modal) {
            this.$refs[modal].toggle('#toggle-btn')
        },
        showModal: function (mondal_id) {
            this.$bvModal.show(mondal_id)
        },

        hideModal: function (mondal_id) {
            this.$bvModal.hide(mondal_id)
        }
    }
}