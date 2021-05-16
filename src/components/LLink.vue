<template>
  <p><i :class="icon" class="mr-3"></i><a :href="linkTo" target="_blank">{{ link }}</a></p>
</template>

<script>
export default {
  name: "LLink",
  data() {
    return {
      tva_icon: 'fas fa-gavel',
      web_icon: 'fas fa-globe',
      facebook_icon: 'fab fa-facebook',
      instagram_icon: 'fab fa-instagram',
      twitter_icon: 'fab fa-twitter',
      linkedin_icon: 'fab fa-linkedin-in',
    }
  },
  props: {
    link: {
      type: String,
      required: true,
      default: ''
    },
    tva: {
      type: Boolean,
      default: false
    },
    web: {
      type: Boolean,
      default: false
    },
    facebook: {
      type: Boolean,
      default: false
    },
    instagram: {
      type: Boolean,
      default: false
    },
    twitter: {
      type: Boolean,
      default: false
    },
    linkedin: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    icon() {
      let boolIcon = [this.tva, this.web, this.facebook, this.instagram, this.twitter, this.linkedin]
      let xxx = boolIcon.filter(value => value === true)
      if (xxx.length === 1) {
        switch (true) {
          case this.tva === true:
            return this.tva_icon
          case this.web === true:
            return this.web_icon
          case this.facebook === true:
            return this.facebook_icon
          case this.instagram === true:
            return this.instagram_icon
          case this.twitter === true:
            return this.twitter_icon
          case this.linkedin === true:
            return this.linkedin_icon
          default:
            return ''
        }
      } else {
        return ''
      }
    },
    linkTo() {
      switch (true) {
        case this.tva === true:
          return `https://kbopub.economie.fgov.be/kbopub/zoeknummerform.html?nummer=${this.link.replace("BE", "")}&actionLu=Recherche`
        case this.web === true:
          return this.link
        case this.facebook === true:
          return this.link
        case this.instagram === true:
          return this.link
        case this.twitter === true:
          return this.link
        case this.linkedin === true:
          return this.link
        default:
          return ''
      }
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>