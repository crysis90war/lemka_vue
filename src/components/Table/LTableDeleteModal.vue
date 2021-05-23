<template>
  <b-modal :id="`delete-modal-${modalId}`" :title="modalTitle">
    <template #modal-footer>
      <div class="text-right">
        <b-button-group size="md">
          <b-button
              variant="outline-primary"
              @click="onClickHideModal"
          >
            Annuler
          </b-button>
          <b-button
              variant="outline-danger"
              @click="onClickDelete"
          >
            Supprimer
          </b-button>
        </b-button-group>
      </div>
    </template>

    <div class="text-center">
      <p>Êtes-vous sure de vouloir supprimer</p>
      <p>"{{ modalText }}"</p>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "LTableDeleteModal",
  props: {
    modalId: {},
    modalTitle: {},
    modalText: {}
  },
  methods: {
    onClickHideModal: function() {
      this.$emit('clickHideModal')
    },
    onClickDelete: function() {
      this.$emit('clickDelete')
    }
  }
}
</script>

<style scoped>

</style>