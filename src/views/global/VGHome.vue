<template>
  <div class="home">
    <lemka-carousel></lemka-carousel>
    <l-separateur :titre="separateurs[0].titre" :sous-titre="separateurs[0].sousTitre"/>

    <l-features/>

    <l-separateur
        :titre="separateurs[1].titre"
        :sous-titre="separateurs[1].sousTitre"
    />

    <div class="px-5">
      <l-spinner v-if="loading === true"/>
      <l-carousel
          v-else
          :disable3d="false"
          :controls-visible="true"
          :border="0"
          :height="430"
          :width="380"
          :space="400"
          :display="4"
          :perspective="0"
          :inverse-scaling="-70"
          :loop="true"
          :autoplay="true"
          :autoplayTimeout="15000"
          :animationSpeed="3000"
      >
        <l-slide
            v-for="(article, index) in articles"
            :index="index"
            :key="article.id"
            class="rounded-lg"
        >
          <figure>
            <b-img
                :src="articleMainImage(article.images)"
                height="430"
            />
            <figcaption class="bg-light text-dark">
              <h3>{{ article.titre }}</h3>
              <p>{{ article.description.substring(0, 80) }} ...
                <b-link :to="{name: routes.ARTICLES_DETAIL.name, params: {slug: article.slug}}">Plus</b-link>
              </p>
            </figcaption>
          </figure>
        </l-slide>
      </l-carousel>
    </div>

    <l-separateur :titre="separateurs[2].titre" :sous-titre="separateurs[2].sousTitre"/>

    <div class="px-5">
      <l-carousel
          :disable3d="false"
          :controls-visible="true"
          :border="0"
          :height="430"
          :width="380"
          :space="400"
          :perspective="0"
          :inverse-scaling="-70"
          :loop="true"
          :autoplay="true"
          :autoplayTimeout="15000"
          :animationSpeed="3000"
      >
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
import {getMainImage, htmlTitle} from "@/utils/tools";
import ApiService from "@/services/api.service";
import LemkaHelpers from "@/helpers";

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
      ],
      routes: LemkaHelpers.Routes,
      articles: [],
      loading: false
    }
  },
  methods: {
    loadArticles: async function() {
      let endpoint = `${LemkaHelpers.Endpoints.DOMAIN}/public/articles/`;
      this.loading = true
      await ApiService.GETDatas(endpoint).then(r => {
        this.articles = r.data
        this.loading = false
      })
    },
    articleMainImage: function(images) {
      return getMainImage(images)
    }
  },
  created() {
    this.loadArticles()
  }
}
</script>

<style lang="scss" scoped>

.carousel-3d-container {
  figcaption {
    position: absolute;
    background-color: #000000;
    opacity: 0.70;
    color: #fff;
    bottom: 0;
    padding: 15px;
    min-width: 100%;
    box-sizing: border-box;

    p {
      opacity: 1!important;
    }
  }
}
</style>