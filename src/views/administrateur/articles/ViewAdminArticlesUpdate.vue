<template>
  <div>
    <b-button variant="light" :to="{name: returnLink, params: {slug: slug}}">
      <i class="fas fa-arrow-left"></i>
    </b-button>
    {{slug}}
  </div>
</template>

<script>
import {LemkaEnums} from "@/helpers/enums.helper";

export default {
  name: "ViewAdminArticlesUpdate",
  props: {
    slug: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      returnLink: LemkaEnums.Routes.ARTICLES_DETAIL.name,
    }
  },
}
</script>

<style scoped>

</style>