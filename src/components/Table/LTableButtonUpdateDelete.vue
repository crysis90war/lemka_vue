<template>
  <b-button-group size="sm">
    <b-button
        v-b-tooltip.top title="Modifier"
        variant="outline-primary"
        :to="{name: updateRouteToName, params: {id: itemId}}"
    >
      <i class="fas fa-edit"></i>
    </b-button>

    <b-button
        v-b-tooltip.top title="Supprimer"
        variant="outline-danger"
        @click="onClickShowModal"
    >
      <i class="fas fa-trash-alt"></i>
    </b-button>
  </b-button-group>
</template>

<script>
export default {
  name: "LTableButtonUpdateDelete",
  props: {
    updateRouteToName: {},
    itemId: {}
  },
  methods: {
    onClickShowModal: function() {
      this.$emit('clickShowModal')
    }
  }
}
</script>

<style scoped>

</style>