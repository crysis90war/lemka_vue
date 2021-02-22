<template>
  <b-card>
    <b-card-body>
      <div v-if="loading === true" class="loading">
        <b-spinner type="grow" label="Loading..." variant="secondary"></b-spinner>
      </div>

      <b-card v-else :class="BSClass.CARD_BORDERLESS_SHADOW">
        <b-row>
          <b-col lg="7" :class="images.length > 0 ? '' : 'my-auto'">
            <lightbox v-if="images.length > 0" :cells="2" :items="images"></lightbox>
            <div v-else class="text-center">
              <p>Pas d'images</p>
            </div>
          </b-col>
          <b-col lg="5">
            <span class="text-muted">{{ article.created_at }}</span>
            <h3>{{ article.titre }}</h3>
            <h5>{{ article.ref_type_service.type_service }}</h5>
            <p>{{ article.description }}</p>
            <span v-for="(tag, index) in article.ref_tag" :key="index">
              <b-badge pill variant="secondary" class="mr-1">{{tag.tag}}</b-badge>
            </span>
            <br>
            <br>
            <span class="text-danger">
              <i :class="icons.heart"></i>
              {{article.likes_count}}
            </span>

            <div class="pull-bottom mt-5">
              <b-button-group class="d-flex justify-content-center">
                <b-button variant="outline-primary" :to="{name: links.articleUpdateLink, params: {slug: article.slug}}">
                  Modifier
                </b-button>
                <b-button variant="outline-warning">
                  Désactiver
                </b-button>
                <b-button variant="outline-danger">
                  Supprimer
                </b-button>
              </b-button-group>
            </div>
          </b-col>
        </b-row>
      </b-card>

    </b-card-body>
  </b-card>
</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";
import ArticleModel from "@/models/article.model";
import ApiService from "@/services";
import LemkaHelpers from "@/helpers";

export default {
  name: "ViewAdminArticlesDetail",
  props: {
    slug: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      loading: false,
      article: new ArticleModel(),
      images: [],
      articleObject: new ArticleModel(),
      error: null,
      links: {
        articlesLink: LemkaEnums.Routes.ARTICLES.name,
        articleUpdateLink: LemkaEnums.Routes.ARTICLES_UPDATE.name
      },
      BSClass: LemkaHelpers.BSClass,
      icons: {
        heart: LemkaHelpers.FontAwesomeIcons.HEART
      }
    }
  },

  computed: {
    thisRoute() {
      return this.$route.name
    }
  },

  methods: {
    async chargerArticle() {
      try {
        this.loading = true

        let article = {}
        article = await ArticleModel.getArticleDetail(this.slug)

        Object.assign(this.article, article)

        await ApiService.ArticleService.getArticleImagesList(article.slug).then(response => {
          response.data.forEach(image => {
            this.images.push(image.image)
          })
        })

      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    }
  },

  created() {
    this.chargerArticle()
  },

  mounted() {

  }
}
</script>

<style scoped>

</style>