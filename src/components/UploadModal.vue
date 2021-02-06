<template>
  <b-modal :id="modalId" ref="image-modal" hide-footer title="Modifier image du profil">
    <div class="d-block text-center">
      <b-form-file v-model="image" multiple accept="image/jpeg, image/png" required></b-form-file>
    </div>

    <b-img :src="preview" alt="" class="w-100"></b-img>

    <b-button class="mt-2" variant="outline-success" block>Modifier</b-button>
    <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Annuler</b-button>
  </b-modal>
</template>

<script>
export default {
  name: "UploadModal",
  props: {
    user: {
      type: Object,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    modalId: {
      type: String,
      default: 'image-modal'
    }
  },
  data() {
    return {
      image: null,
      preview: null,
    }
  },
  methods: {
    hideModal() {
      this.$bvModal.hide(this.modalId)
    },
    previewImage: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        }
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
  },
}
</script>

<style scoped>

</style>