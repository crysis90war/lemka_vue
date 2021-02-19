<template>
  <b-modal :id="modalId" ref="image-modal" hide-footer title="Modifier image du profil" size="xl">
    <b-form @submit.prevent="updateImage">

      <b-form-group id="input-group-image"
                    label-for="input-image"
                    description="Formats autorisés .jpg et .png">
        <b-form-file id="input-image"
                     ref="image"
                     name="input-image"
                     accept="image/jpeg, image/png, .jpg, .png,"
                     v-model="image"
                     @change="previewImage"
                     required></b-form-file>
      </b-form-group>

      <!-- TODO - Mettre le cropper a la suite de ce commentaire -->
      <div class="d-flex">
        <cropper class="cropper"
                 style="max-width: 720px; max-height: 576px"
                 :src="preview"
                 :stencil-props="{
                 handlers: {},
                 movable: true,
                 scalable: true,
                 resizable: true
               }"
                 :stencil-size="{
                 width: 480,
                 height: 480
               }"
                 @change="change"/>

        <b-img v-if="destination !== null" :src="destination" height="360" width="360"></b-img>
      </div>
      <b-button-group class="d-flex">
        <b-button variant="outline-success" type="submit">Modifier</b-button>
        <b-button variant="outline-danger" @click="hideModal">Annuler</b-button>
      </b-button-group>
    </b-form>
  </b-modal>
</template>

<script>
import ProfilModel from "@/models/profil.model";
import {Cropper} from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import {dataURLtoFile} from "@/helpers/functions.helper";

export default {
  name: "UploadModal",
  components: {
    Cropper
  },
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
      cropper: null,
      image: null,
      preview: null,
      destination: null,
      formData: new FormData()
    }
  },

  methods: {
    previewImage: function (event) {
      let input = event.target;
      let formatImage = [
        "image/jpeg",
        "image/png"
      ]
      if (formatImage.includes(input.files[0]['type'])) {
        console.log('vrai')
      } else {
        console.log('faux')
      }
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
      }
    },

    // eslint-disable-next-line no-unused-vars
    change({ coordinates, canvas, image }) {
      // console.log(coordinates, canvas, image)
      this.destination = canvas.toDataURL()

      let formData = new FormData()
      let file = dataURLtoFile(canvas.toDataURL())
      formData.append('image', file, 'image.jpg')
      this.formData = formData
    },

    async updateImage() {
      await ProfilModel.updateProfilImage(this.formData)
      window.location.reload()
    },

    hideModal() {
      this.$bvModal.hide(this.modalId)
    },
  },
}
</script>

<style scoped>
</style>