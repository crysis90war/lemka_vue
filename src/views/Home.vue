<template>
  <div class="home">
    <l-separateur :titre="separateurs[0].titre" :sous-titre="separateurs[0].sousTitre"/>

    <l-features/>

    <l-separateur :titre="separateurs[1].titre" :sous-titre="separateurs[1].sousTitre"/>

    <div class='container-fluid px-5'>
      <l-spinner v-if="isLoading === true"/>

      <div class="flex-container px-5" v-else>
        <div v-for="article in newArticles" :key="article.id" class="flex-item">
          <div class="card h-100">
            <img class='mx-auto img-thumbnail' :src="getMainImage(article.images)" width="auto" height="auto" alt=""/>
            <div class="card-body text-center mx-auto">
              <h5 class="card-title">{{ article.titre }}</h5>
            </div>
            <router-link :to="{ name: 'articlesDetails', params: { slug: article.slug }}" class="btn btn-grad btn-sm">
              Détails
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <l-separateur :titre="separateurs[2].titre" :sous-titre="separateurs[2].sousTitre"/>
    <div class='container-fluid px-5'>
      <l-spinner v-if="isLoading === true"/>

      <ul class="flex-container px-5">
        <li v-for="article in popularArticles" :key="article.id" class="flex-item">
          <div class="card h-100">
            <img class='mx-auto img-thumbnail' :src="getMainImage(article.images)" width="auto" height="auto" alt=""/>
            <div class="card-body text-center mx-auto">
              <h5 class="card-title">{{ article.titre }}</h5>
            </div>
            <router-link :to="{ name: 'articlesDetails', params: { slug: article.slug }}" class="btn btn-grad btn-sm">
              Détails
            </router-link>
          </div>
        </li>
      </ul>
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

  </div>
</template>

<script>

import LReviewCard from "@/components/LReviewCard";
import LFeatures from "@/components/LFeatures";
import {htmlTitle} from "@/utils/tools";
import ApiService from "@/services/api.service";
import LemkaHelpers from "@/helpers";
import {commonMixin} from "@/mixins/common.mixin";

export default {
  name: 'Home',
  components: {
    LFeatures,
    LReviewCard,
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
    loadLastArticles: async function () {
      let endpoint = `public/last/`;
      await ApiService.GETDatas(endpoint).then(r => {
        this.newArticles = r.data
      })
    },
    loadPopularArticles: async function () {
      let endpoint = `public/popular/`;
      await ApiService.GETDatas(endpoint).then(r => {
        this.popularArticles = r.data
      })
    },
    initialisation: async function () {
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
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.flex-container {
  display: flex;
  justify-content: space-between;
}

.flex-item {
  align-items: stretch;
  flex: 0 1 calc(20% - 15px); /* <-- adjusting for margin */
}

.img-thumbnail {
  border: none;
  padding: 0;
}

.card {
  padding: 0;
  box-shadow: 0 20px 40px rgba(0, 0, 0, .2);
  border-radius: 5px;
}

.card-title {
  font-size: 14px;
  font-weight: 900
}

.card-text {
  font-size: 14px;
  font-family: sans-serif;
  font-weight: 500
}

.btn-grad {
  background-image: linear-gradient(to right, #834d9b 0%, #d04ed6 51%, #834d9b 100%);
  margin: 10px;
  text-align: center;
  text-transform: uppercase;
  background-size: 200% auto;
  color: white;
  border-radius: 20px;
  border: none;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  transition: transform 80ms ease-in;

  &:hover {
    background-position: right center;
    color: #fff;
    text-decoration: none;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
}
</style>