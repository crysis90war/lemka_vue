<template>
  <span v-if="condition">{{ errorMessage }}</span>
</template>

<script>
export default {
  name: "InvalidFeedback",
  props: {
    condition: {},
    errorMessage: {}
  }
}
</script>

<style scoped>

</style>