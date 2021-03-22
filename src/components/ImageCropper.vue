<template>
  <div>
    <b-form-group description="Formats autorisés .jpg et .png">
      <b-form-file v-model="image" required
                   ref="image" accept="image/jpeg, image/png, .jpg, .png,"
                   @change="previewImage"></b-form-file>
    </b-form-group>

    <div class="d-flex justify-content-between">
      <cropper class="cropper" style="max-width: 720px; max-height: 576px" :src="preview"
               :stencil-props="{
                 handlers: {},
                 movable: true,
                 scalable: true,
                 resizable: false
               }"
               :stencil-size="{
                 width: 360,
                 height: 480
               }"
               @change="change"/>

      <b-img :src="destination" height="480" width="360"></b-img>
    </div>
  </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

export default {
  name: "L-imageCropper",
  components: {
    Cropper,
  },
  data() {
    return {
      cropper: {},
      destination: null,
      image: null,
      preview: null
    }
  },
  methods: {
    previewImage: function (event) {
      let input = event.target;
      if (input.files[0]['type'] !== 'image/jpeg') {
        console.log(input.files[0]['type'])
      }
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
      }
    },
    change({ coordinates, canvas }) {
      this.destination = canvas.toDataURL()
      console.log(coordinates, canvas)
    }
  },

  mounted() {
  }
}
</script>

<style scoped>

</style>