<template>
  <div class="lemka_carousel">
    <l-carousel :controls-visible="true" :clickable="true" :border="0" :space="680"
                :width="680" :height="480" :perspective="25"
                :inverseScaling="150" :display="3" :loop="true" :autoplay="true" :autoplayTimeout="15000" :animationSpeed="3000">
      <l-slide v-for="(slide, i) in slides" :key="i" :index="i">
        <figure :style="`background-image: url(${slide}); background-repeat: no-repeat; background-size: cover;`"
                class="h-100 w-100 text-center">

          <figcaption class="fig-top" style="display: none;">
            <h4>Title</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </figcaption>

          <figcaption class="fig-bottom" style="display: none;">
            <b-button variant="light" disabled>
              Voir plus
            </b-button>
          </figcaption>
        </figure>
      </l-slide>
    </l-carousel>
  </div>
</template>

<script>

export default {
  name: "Carousel",
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

<style lang="scss" scoped>

.carousel-3d-slide.current {
  > figure {
    > .fig-top {
      display: block !important;
      position: absolute;
      background-color: #FFFFFF;
      opacity: 0.7;
      color: #000000;
      top: 0;
      padding: 10px;
      min-width: 100%;
      box-sizing: border-box;
    }
    > .fig-bottom {
      display: block !important;
      position: absolute;
      bottom: 0;
      padding: 15px;
      min-width: 100%;
      box-sizing: border-box;
    }
  }
}
</style>