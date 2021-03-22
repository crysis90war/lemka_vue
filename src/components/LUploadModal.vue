<template>
  <b-modal :id="modalId" ref="image-modal" hide-footer title="Modifier image du profil" size="xl">
    <b-form @submit.prevent="updateImage">

      <b-form-group description="Formats autorisés .jpg et .png">
        <b-form-file v-model="image" required ref="image" accept="image/jpeg, image/png, .jpg, .png,"
                     @change="previewImage"/>
      </b-form-group>

      <b-row class="my-2">
        <b-col lg="7">
          <cropper :src="preview" class="cropper" style="max-width: 720px; max-height: 576px" @change="change"
                   :stencil-props="{
                   handlers: {},
                   movable: true,
                   scalable: true,
                   resizable: true
                 }"
                   :stencil-size="{
                   width: 480,
                   height: 480
                 }"/>
        </b-col>
        <b-col lg="5">
          <b-img v-if="destination !== null" :src="destination" height="360" width="360"></b-img>
        </b-col>
      </b-row>

      <b-button-group>
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
  name: "L-uploadModal",
  components: {
    Cropper
  },
  props: {
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

    updateImage: async function() {
      // let endpoint = `${LemkaHelpers.Endpoints.DOMAIN}/profil/`;
      // TODO - UPLOAD IMAGE
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