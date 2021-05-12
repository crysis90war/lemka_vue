<template>
  <div class="article_detail">
    <l-spinner v-if="isLoading"/>

    <div v-else class="my-5">
      <b-container>
        <b-row>
          <b-col
              lg="7"
              :class="article.images.length > 0 ? '' : 'my-auto'"
          >
            <lightbox
                v-if="article.images.length > 0"
                :items="getImagesUrl(article.images)"
                :cells="3"
            />
            <div
                v-else
                class="text-center"
            >
              <p>Cet article n'a pas d'images</p>
            </div>
          </b-col>

          <b-col lg="5">
            <span class="text-muted">{{ article.created_at | localTimeStr }}</span>
            <h3>{{ article.titre }}</h3>
            <h5>{{ article.type_service.type_service }}</h5>
            <p style="white-space: pre-wrap">{{ article.description }}</p>
            <div class="d-flex justify-content-start">
              <b-badge
                  v-for="(tag, index) in article.tags"
                  :key="index"
                  pill
                  variant="secondary"
                  class="mr-1"
              >
                {{ tag.tag }}
              </b-badge>
            </div>
            <div v-if="currentUser" class="my-5">
              <b-button
                  size="sm"
                  variant="outline-danger"
                  @click="createOrDeleteLike(article.slug)"
              >
                <i :class="icons.HEART"></i> {{ article.likes_count }}
              </b-button>
            </div>
            <div v-else class="my-5">
              <span class="text-danger"><i :class="icons.HEART"></i> {{ article.likes_count }}</span>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import ArticleModel from "@/models/article/article.model";
import LemkaHelpers from "@/helpers";
import {localTimeStr} from "@/utils/filters";
import {htmlTitle} from "@/utils/tools";
import {commonMixin} from "@/mixins/common.mixin";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "VAArticleDetail",
  mixins: [commonMixin],
  props: {
    slug: {
      type: String,
      required: true
    },
  },
  title() {
    return htmlTitle('Article')
  },
  data() {
    return {
      article: new ArticleModel(),
      routes: LemkaHelpers.Routes,
      BSClass: LemkaHelpers.BSClass,
      icons: LemkaHelpers.FontAwesomeIcons,
    }
  },

  computed: {
    ...mapGetters({articles: 'Articles/articles', currentUser: "Auth/user"}),
    thisRoute() {
      return this.$route.name
    },
  },

  methods: {
    ...mapActions({
      loadGlobalArticles: "Articles/loadGlobalArticles",
      createLike: "Articles/createLike",
      deleteLike: "Articles/deleteLike"
    }),
    initialisation: async function () {
      if (this.articles.length === 0) {
        await this.loadGlobalArticles()
      }
    },
    chargerArticle: async function () {
      this.toggleLoading()
      await this.initialisation()
      let article = await this.$store.getters["Articles/articleBySlug"](this.$route.params.slug)
      if (article !== undefined) {
        Object.assign(this.article, await this.$store.getters["Articles/articleBySlug"](this.$route.params.slug))
        this.$route.meta.value = this.article.titre
        this.toggleLoading()
      } else {
        this.toggleLoading()
        await this.$router.push({name: this.routes.PAGE_NOT_FOUND_ROUTE.name})
      }
    },
    createOrDeleteLike: function (slug) {
      let like = this.article.user_liked
      if (like === true) {
        this.deleteLike(slug).then(r => {
          Object.assign(this.article, r)
        })
      } else if (like === false) {
        this.createLike(slug).then(r => {
          Object.assign(this.article, r)
        })
      } else {
        console.log("Une erreur s'est produit lors de traitement !")
      }
    }
  },

  filters: {
    localTimeStr: function (value) {
      value = localTimeStr(value)
      return value
    },
  },

  created() {
    this.chargerArticle()
  },
}
</script>

<style scoped>

</style>