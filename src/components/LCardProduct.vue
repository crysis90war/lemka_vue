<template>
  <b-card
      class="box-shadow"
      :img-src="imgSrc"
      :img-height="imgHeight"
      :img-alt="imgAlt"
      :img-left="imgLeft"
      :img-top="imgTop"
  >
    <b-card-title>
      <b-link v-if="slugTrue" :to="{name: toRoute, params: {slug: toParam}}">{{ title }}</b-link>
      <b-link v-if="idTrue" :to="{name: toRoute, params: {id: toParam}}">{{ title }}</b-link>
    </b-card-title>
    <b-card-text>
      {{ description }}
    </b-card-text>
    <div class="d-flex justify-content-start" v-if="tags && listShow === true">
      <b-badge
          v-for="(tag, index) in tags"
          :key="index"
          pill
          variant="secondary"
          class="mr-1"
      >
        {{ tag[tagName] }}
      </b-badge>
    </div>
  </b-card>
</template>

<script>
export default {
  name: "LCardProduct",
  props: {
    imgSrc: {
      type: String,
      default: require('@/assets/noimage.png')
    },
    imgAlt: {},
    imgHeight: {
      type: String,
      default: '180'
    },
    imgLeft: {
      type: Boolean,
      default: false
    },
    imgTop: {
      type: Boolean,
      default: false
    },
    listShow: {
      type: Boolean,
      default: false
    },
    toRoute: {},
    slugTrue: {
      type: Boolean,
      default: false
    },
    toParam: {},
    idTrue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    tags: {
      default: null
    },
    tagName: {}
  },
  computed: {
    paramRoute() {
      if (this.slugTrue === true && this.idTrue === false) {
        return this.toParam
      } else if (this.slugTrue === false && this.idTrue === true) {
        return this.toParam
      } else {
        return ""
      }
    }
  }
}
</script>

<style scoped lang="scss">
.box-shadow {
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
}
</style>