import {localTimeStr} from "@/utils/filters";

export const commonMixin = {
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
        makeToast(variant = null, message = "", titre = "") {
            this.$bvToast.toast(message, {
                title: `${titre}`,
                variant: variant,
                solid: true
            })
        },
        userRank: function (user) {
            let is_staff = user.is_staff;
            let is_superuser = user.is_superuser;
            let status = {
                user_type: '',
                variant: ''
            }
            if (user.is_staff === true && is_superuser === false) {
                status.user_type = 'Administrateur'
                status.variant = 'success'
                return status;
            } else if (is_staff === true && is_superuser === true) {
                status.user_type = 'Webmaster'
                status.variant = 'warning'
                return status;
            } else if (is_staff === false && is_superuser === false) {
                status.user_type = 'Utilisateur'
                status.variant = 'primary'
                return status;
            } else {
                console.log('Une erreure est survenue')
                return status
            }
        },
        getMainImage: function(images) {
            if (images.length > 0) {
                let image = images.find(img => img.is_main === true)
                return image.image
            } else {
                return require('@/assets/noimage.png')
            }
        },
        getImagesUrl: function (images) {
            let urls = []
            images.forEach(item => {
                urls.push(item.image)
            })
            return urls
        },
        validateState(object, name) {
            const {$dirty, $error} = object[name]
            return $dirty ? !$error : null;
        }
    },
    filters: {
        localTimeStr: function (value) {
            value = localTimeStr(value)
            return value
        },
    },
}