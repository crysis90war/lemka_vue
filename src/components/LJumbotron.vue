<template>
  <b-jumbotron>
    <pre style="white-space: pre-wrap">
      {{ data }}
    </pre>
  </b-jumbotron>
</template>

<script>
export default {
  name: "LJumbotron",
  props: {
    data: {}
  }
}
</script>

<style scoped>

</style>