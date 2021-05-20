<template>
  <div class="home">
    <lemka-carousel/>
    <l-separateur :titre="separateurs[0].titre" :sous-titre="separateurs[0].sousTitre"/>

    <l-features/>

    <l-separateur
        :titre="separateurs[1].titre"
        :sous-titre="separateurs[1].sousTitre"
    />

    <div class="px-5">
      <l-spinner v-if="isLoading === true"/>
      <l-carousel
          v-else
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
        <l-slide
            v-for="(article, index) in newArticles"
            :index="index"
            :key="article.id"
            class="rounded-lg"
        >
          <figure>
            <b-img-lazy
                :src="getMainImage(article.images)"
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
      <l-spinner v-if="isLoading === true"/>
      <l-carousel
          v-else
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
        <l-slide
            v-for="(article, index) in popularArticles"
            :index="index"
            :key="article.id"
            class="rounded-lg"
        >
          <figure>
            <b-img-lazy
                :src="getMainImage(article.images)"
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

    <l-separateur :titre="separateurs[3].titre" :sous-titre="separateurs[3].sousTitre"/>

    <b-container fluid="lg">
      <b-row>
        <b-col lg="6">
          <l-review-card username="Dolores" :value="4.5"/>
        </b-col>
        <b-col lg="6">
          <l-review-card username="Christine" :value="4.0"/>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="6">
          <l-review-card username="Jean-Luc" :value="4.5"/>
        </b-col>
        <b-col lg="6">
          <l-review-card username="Nova" :value="5.0"/>
        </b-col>
      </b-row>
    </b-container>

    <lemka-map></lemka-map>
  </div>
</template>

<script>

import Carousel from '@/components/Carousel'
import GoogleMap from "@/components/GoogleMap";
import LReviewCard from "@/components/LReviewCard";
import LFeatures from "@/components/LFeatures";
import {htmlTitle} from "@/utils/tools";
import ApiService from "@/services/api.service";
import LemkaHelpers from "@/helpers";
import {commonMixin} from "@/mixins/common.mixin";

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
  mixins: [commonMixin],
  data() {
    return {
      separateurs: [
        {titre: 'LEMKA - Atelier de couture', sousTitre: 'NOS DIVERS SERVICES'},
        {titre: 'NOUVEAUX PRODUITS', sousTitre: 'NOS TOUS DERNIERS ARTICLES PUBLIÉS'},
        {titre: 'PRODUITS POPULAIRES', sousTitre: 'nos articles les plus populaires'},
        {titre: 'TÉMOIGNAGES', sousTitre: 'ILS NOUS FONT CONFIANCE'},
      ],
      routes: LemkaHelpers.Routes,
      newArticles: [],
      popularArticles: [],
    }
  },
  methods: {
    loadLastArticles: async function() {
      let endpoint = `public/last/`;
      await ApiService.GETDatas(endpoint).then(r => {
        this.newArticles = r.data
      })
    },
    loadPopularArticles: async function() {
      let endpoint = `public/popular/`;
      await ApiService.GETDatas(endpoint).then(r => {
        this.popularArticles = r.data
      })
    },
    initialisation: async function() {
      this.toggleLoading()
      await this.loadLastArticles()
      await this.loadPopularArticles()
      this.toggleLoading()
    }
  },
  created() {
    this.initialisation()
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