<template>
  <section class="lemka_carousel">
    <l-carousel
        :controls-visible="true"
        :clickable="true"
        :border="0"
        :space="845"
        :width="860"
        :height="480"
        :perspective="25"
        :inverseScaling="150"
        :display="3"
        :loop="true"
        :autoplay="true"
        :autoplayTimeout="15000"
        :animationSpeed="3000"
    >
      <l-slide
          v-for="(slide, i) in carousel"
          :key="i"
          :index="i"
          class="rounded-lg"
      >
        <figure
            :style="`background-image: url(${slide.image}); background-repeat: no-repeat; background-size: cover;`"
            class="h-100 w-100 text-center"
        >
          <figcaption class="fig-top" style="display: none;">
            <h4>{{ slide.titre }}</h4>
            <p>{{ slide.description }}</p>
          </figcaption>

          <figcaption class="fig-bottom" style="display: none;">
            <b-button variant="light" :to="slide.link">
              Voir plus
            </b-button>
          </figcaption>
        </figure>
      </l-slide>
    </l-carousel>
  </section>
</template>

<script>

export default {
  name: "Carousel",
  data() {
    return {
      carousel: [
        {
          image: require('@/assets/carousel/realisations.jpg'),
          titre: "Réalisations",
          description: "Un aperçu de nos réalisations et de notre savoir faire dans la couture, du vêtements de tous les jours au sur-mesure haut de gamme.",
          link: {name: 'VGRecherche', params: {propCategorie: 'Articles'}}
        },
        {
          image: require('@/assets/carousel/merceries.jpg'),
          titre: "Merceries",
          description: "Profitez de notre grande sélection de tissus pour tous vos projets ! Nous avons sélectionné pour vous le meilleur des tissus pour vos vêtements et accessoires!",
          link: {name: 'VGRecherche', params: {propCategorie: 'Merceries'}}
        },
        {
          image: require('@/assets/carousel/rendezvous.jpg'),
          titre: "Rendez-vous",
          description: "Voulez-vous prendre rendez-vous pour un service ou un devis ? Créez ou connectez vous pour vous rendre dans la section rendez-vous!",
          link: ""
        },
        {
          image: require('@/assets/carousel/devis.jpg'),
          titre: "Devis",
          description: "Vous avez besoin d'un devis ? Crééz un compte ou connectez vous pour vous rendez dans la section demande de devis!",
          link: ""
        },
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
      opacity: 0.75;
      color: #000000;
      top: 30%;
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