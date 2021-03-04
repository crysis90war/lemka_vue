<template>
      <div v-if="loading === true" class="loading text-center">
        <b-spinner type="grow" label="Loading..." variant="secondary"></b-spinner>
      </div>

      <div v-else>
        <b-row>
          <b-col lg="7" :class="images.length > 0 ? '' : 'my-auto'">
            <lightbox v-if="images.length > 0" :cells="2" :items="images"></lightbox>
            <div v-else class="text-center">
              <p>Pas d'images</p>
            </div>
          </b-col>

          <b-col lg="5">
            <span class="text-muted">{{ article.created_at | localTimeStr }}</span>
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
                <b-button :variant="article.est_active === true ? 'outline-secondary' : 'outline-success'"
                          @click="activerDesactiverArticle(article.slug, article.est_active)">
                  {{ article.est_active === true ? 'Désactiver' : 'Publier' }}
                </b-button>
                <b-button variant="outline-danger">
                  Supprimer
                </b-button>
              </b-button-group>
            </div>
          </b-col>
        </b-row>
      </div>
</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";
import ArticleModel from "@/models/article.model";
import ApiService from "@/services";
import LemkaHelpers from "@/helpers";
import {localTimeStr} from "@/utils/filters";

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
        articleUpdateLink: LemkaHelpers.Routes.ARTICLES_ADD_OR_UPDATE.name
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
        article = await ArticleModel.fetch_article_by_slug(this.slug)

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
    },

    activerDesactiverArticle: async function(articleSlug, article) {
      try {
        let data = {
          "est_active": !article.est_active
        }
        await ApiService.ArticleService.patchArticle(articleSlug, data)
      } catch (error) {
        console.log(error)
      } finally {
        await this.chargerArticle()
      }
    },
  },

  filters: {
    localTimeStr: function (value) {
      value = localTimeStr(value)
      return value
    }
  },

  created() {
    this.chargerArticle()
  },
}
</script>

<style scoped>

</style>