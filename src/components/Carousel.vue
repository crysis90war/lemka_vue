<template>
  <carousel-3d
      :controls-visible="true"
      :clickable="true"
      :border="0"
      :space="680"
      :width="680"
      :height="480"
      :perspective="25"
      :inverseScaling="150"
      :display="3"
      :loop="true"
      :autoplay="true"
      :autoplayTimeout="5000"
      :animationSpeed="2000">
    <slide v-for="(slide, i) in slides" :key="i" :index="i">
      <figure :style="`background-image: url(${slide}); background-repeat: no-repeat; background-size: cover;`" class="h-100 w-100">
        <b-container class="h-100">
          <b-card
              class="text-center"
              title="Card Title"
              tag="article"
              style="max-width: 20rem; top: 25%; left: 25%; display: none;"
          >
            <b-card-text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </b-card-text>

            <b-link href="#" class="text-secondary">Voir plus</b-link>
          </b-card>
        </b-container>
      </figure>
    </slide>
  </carousel-3d>
</template>

<script>
import {Carousel3d, Slide} from "vue-carousel-3d";

export default {
name: "Carousel",
  components: {
    'carousel-3d': Carousel3d,
    'slide': Slide
  },
  data() {
    return {
      slides: [
        "https://lemka.be/images/backgroundsection.jpg",
        "https://lemka.be/images/backgroundsection2.jpg",
        "https://lemka.be/images/backgroundsection3.jpg",
        "https://image.freepik.com/psd-gratuit/vue-dessus-fermeture-eclair-disposition-fils_23-2148591902.jpg",
        "https://image.freepik.com/psd-gratuit/conception-dessins-cousus-main-fils_23-2148685201.jpg"
      ]
    }
  },
}
</script>

<style scoped>

.carousel-3d-slide.current>figure>.container>.card {
  display: block!important;
}
</style>