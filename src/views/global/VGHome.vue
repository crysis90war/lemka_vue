<template>
  <div class="home">
    <lemka-carousel></lemka-carousel>
    <l-separateur :titre="separateurs[0].titre" :sous-titre="separateurs[0].sousTitre"/>

    <l-features></l-features>

<!--    <b-container>-->
<!--      <div class="text-justify">-->
<!--        <p>-->
<!--          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut odio sagittis, posuere diam eget, scelerisque lectus. Sed a-->
<!--          metus-->
<!--          viverra justo ultricies maximus ut eu dolor. Nam sollicitudin dui risus, vitae pharetra leo sagittis sit amet. Cras feugiat arcu-->
<!--          ac-->
<!--          felis dignissim lobortis. Curabitur blandit justo eget erat interdum consectetur. Vestibulum vel molestie elit, eget feugiat urna.-->
<!--          Mauris molestie purus nec eros finibus consequat.-->
<!--        </p>-->

<!--        <p>-->
<!--          Cras nec lectus a risus lacinia scelerisque vel eget velit. Cras suscipit, nibh vitae consectetur ultrices, elit quam ornare-->
<!--          tellus,-->
<!--          pulvinar varius nulla velit at sem. Duis diam velit, finibus quis tincidunt at, ultricies vitae ipsum. Donec eget placerat mi, at-->
<!--          condimentum ipsum. Phasellus mollis a lacus vitae consectetur. Etiam et congue metus, vel euismod orci. Sed ut lectus eu lectus-->
<!--          placerat laoreet. Cras non quam vestibulum, auctor arcu tincidunt, maximus erat. Nam efficitur dictum dolor vitae luctus.-->
<!--          Pellentesque bibendum enim justo, a finibus mauris tincidunt eget. Donec id augue nec neque fermentum euismod. Praesent tellus-->
<!--          nibh,-->
<!--          laoreet nec sapien et, finibus pretium massa. Aenean odio dui, sodales id mauris sit amet, luctus lobortis turpis. Cras nisi ante,-->
<!--          fermentum a maximus non, ultrices vel ligula. Vestibulum laoreet cursus enim, ac sagittis eros vestibulum in. Praesent quis ornare-->
<!--          orci.-->
<!--        </p>-->

<!--        <p>-->
<!--          Aliquam pharetra massa sit amet lacus semper, ut imperdiet nunc ultrices. Ut sed commodo mi. Aliquam ex odio, fringilla quis dolor-->
<!--          a, auctor aliquet velit. Suspendisse id lacus id augue convallis tincidunt auctor at est. Aliquam accumsan augue vel purus-->
<!--          consectetur, sed commodo lorem eleifend. Nulla congue ex felis, in aliquet lacus ullamcorper vel. Cras dapibus imperdiet lorem.-->
<!--          Pellentesque feugiat molestie blandit. Nam suscipit velit magna. Curabitur dolor ipsum, accumsan id mauris eget, lacinia pulvinar-->
<!--          diam. Mauris sit amet augue non ipsum tempor aliquet.-->
<!--        </p>-->
<!--      </div>-->
<!--    </b-container>-->

    <l-separateur :titre="separateurs[1].titre" :sous-titre="separateurs[1].sousTitre"/>

    <div class="px-5">
      <l-carousel :disable3d="false" :controls-visible="true" :border="0"
                  :height="430" :width="380" :space="400" :perspective="0" :inverse-scaling="-70"
                  :loop="true" :autoplay="true" :autoplayTimeout="15000" :animationSpeed="3000">
        <l-slide v-for="(slide, i) in slides" :index="i" :key="i">
          <figure>
            <b-img loading=lazy :src="require('@/assets/noimage.png')" height="430"></b-img>
            <figcaption>
              <h3>{{ slide }} - Titre</h3>
              <p>{{ message.substring(0, 80) }} ...
                <b-link>Plus</b-link>
              </p>
            </figcaption>
          </figure>
        </l-slide>
      </l-carousel>
    </div>

    <l-separateur :titre="separateurs[2].titre" :sous-titre="separateurs[2].sousTitre"/>

    <div class="px-5">
      <l-carousel :disable3d="false" :controls-visible="true" :border="0"
                  :height="430" :width="380" :space="400" :perspective="0" :inverse-scaling="-70"
                  :loop="true" :autoplay="true" :autoplayTimeout="15000" :animationSpeed="3000">
        <l-slide v-for="(slide, i) in slides" :index="i" :key="i">
          <figure>
            <b-img loading=lazy :src="require('@/assets/noimage.png')" height="430"></b-img>
            <figcaption>
              <h3>{{ slide }} - Titre</h3>
              <p>{{ message.substring(0, 80) }} ...
                <b-link>Plus</b-link>
              </p>
            </figcaption>
          </figure>
        </l-slide>
      </l-carousel>
    </div>

    <l-separateur :titre="separateurs[3].titre" :sous-titre="separateurs[3].sousTitre"/>

    <b-container fluid="lg">
      <b-row>
        <b-col lg="6">
          <l-review-card username="Dolores" :value="4.9"/>
        </b-col>
        <b-col lg="6">
          <l-review-card username="Christine" :value="4.7"/>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="6">
          <l-review-card username="Jean-Luc" :value="4.5"/>
        </b-col>
        <b-col lg="6">
          <l-review-card username="Nova" :value="4.6"/>
        </b-col>
      </b-row>
    </b-container>

    <lemka-map></lemka-map>
  </div>
</template>

<script>

import Carousel from '@/components/Carousel'
import GoogleMap from "@/components/GoogleMap";
import LReviewCard from "@/views/global/LReviewCard";
import LFeatures from "@/components/LFeatures";
import {htmlTitle} from "@/utils/tools";

export default {
  name: 'VGHome',
  components: {
    LFeatures,
    LReviewCard,
    'lemka-carousel': Carousel,
    'lemka-map': GoogleMap
  },
  title() {
    return htmlTitle()
  },
  data() {
    return {
      slides: 10,
      message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aut doloremque dolores earum eligendi illo in, itaque maxime molestias, necessitatibus perferendis porro praesentium quisquam quod reiciendis unde vero? Minima, odio!",
      separateurs: [
        {titre: 'LEMKA - Atelier de couture', sousTitre: 'NOS DIVERS SERVICES'},
        {titre: 'NOUVEAUX PRODUITS', sousTitre: 'LOREM IPSUM DOLOR SITE CONSECTETUER'},
        {titre: 'PRODUITS POPULAIRES', sousTitre: 'LOREM IPSUM DOLOR SITE CONSECTETUER'},
        {titre: 'TÉMOIGNAGES', sousTitre: 'ILS NOUS FONT CONFIANCE'},
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

.carousel-3d-container figcaption {
  position: absolute;
  background-color: #000000;
  opacity: 0.45;
  color: #fff;
  bottom: 0;
  padding: 15px;
  min-width: 100%;
  box-sizing: border-box;
}
</style>