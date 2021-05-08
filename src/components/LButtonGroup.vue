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
          :variant="params !== undefined ? 'outline-primary' : 'outline-success'"
          :disabled="submitStatus === 'PENDING'"
          @click.prevent="submit"
      >
        {{ params !== undefined ? 'Modifier' : 'Ajouter' }}
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
    params: {},
    position: {
      type: String,
      default: 'left'
    }
  },
}
</script>

<style scoped>

</style>