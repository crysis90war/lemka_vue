<template>
  <b-jumbotron :header="header">
    <pre style="white-space: pre-wrap">
      {{ data }}
    </pre>
  </b-jumbotron>
</template>

<script>
export default {
  name: "LJumbotron",
  props: {
    data: {},
    header: {
      type: String,
      default: "Header"
    }
  }
}
</script>

<style scoped>

</style>