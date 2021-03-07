export const fonctions = {
    methods: {
        toggleModal: function(modal) {
            this.$refs[modal].toggle('#toggle-btn')
        }
    }
}