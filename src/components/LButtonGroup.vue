<template>
  <div :class="`text-${position}`">
    <b-button-group>
      <b-button
          variant="outline-dark"
          :to="{name: to}"
      >
        <i class="fas fa-arrow-left"></i>
      </b-button>
      <b-button
          :variant="!params ? 'outline-primary' : 'outline-success'"
          :disabled="submitStatus === 'PENDING'"
          @click.prevent="submit"
      >
        {{ !params ? 'Modifier' : 'Ajouter' }}
      </b-button>
    </b-button-group>
  </div>
</template>

<script>
export default {
  name: "LButtonGroup",
  props: {
    to: {
      type: String,
      default: ""
    },
    submit: {
      type: Function,
      required: true
    },
    submitStatus: {
      type: String,
      defaul: null
    },
    params: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'left'
    }
  },
}
</script>

<style scoped>

</style>