export const validationMessageMixin = {
    methods: {
        minLength: function (min) {
            return `Ce champ doit contenir au moins ${min} caractères !`
        },

        decimal: function() {
            return 'Ce champ doit être un montant en décimale !'
        },

        maxLength: function(max) {
            return `Ce champ doit contenir au maximum ${max} lettres !`
        },

        between: function (min, max) {
            return `Ce champ doit être compris entre ${min} et ${max} !`
        },

        required: function() {
            return 'Ce champ est requis !'
        },

        alpha: function() {
            return 'Ce champ ne doit contenir que des lettres !'
        },

        alphaNum: function() {
            return 'Ce champ doit être alphanumérique !'
        },

        numeric: function() {
            return 'Ce champ doit être numérique !'
        },

        email: function() {
            return 'Ce champ doit être un email valide !'
        },

        url: function() {
            return 'Ce champ doit être un lien Web valide !'
        },

        minValue: function (min) {
            return `Ce champ doit avoir une valeur minimal de ${min} !`
        },

        sameAs: function() {
            return 'Votre mot de passe doit être identique !'
        }
    }
}