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
        /**
         * NOtification en haut a droite
         * @param variant une des variante de bootstrap
         * @param message message en string, par défaut un toast
         * @param titre
         */
        makeToast(variant = null, message = "", titre = "") {
            this.$bvToast.toast(message, {
                title: `${titre}`,
                variant: variant,
                solid: true
            })
        },
    }
}