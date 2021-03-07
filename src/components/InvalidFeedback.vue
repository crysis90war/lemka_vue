<template>
  <div>
    <span v-if="condition">{{ errorMessage }}</span>
  </div>
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