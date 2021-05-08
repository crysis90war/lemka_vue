export const fonctions = {
    data() {
        return {
            isLoading: false
        }
    },
    methods: {
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
        validateState(object, name) {
            const {$dirty, $error} = object[name]
            return $dirty ? !$error : null;
        },
    }
}