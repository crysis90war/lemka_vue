<template>
  <div>
    <template title>
      <h4>{{ titre }}</h4>
    </template>
    <hr>
  </div>
</template>

<script>
export default {
  name: "CardTemplateTitle",
  props: {
    titre: {
      type: null,
      default: 'Titre',
      required: true
    },
  },
}
</script>

<style scoped>

</style>