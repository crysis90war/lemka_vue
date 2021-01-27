<template>
  <div>
    <b-button variant="light" :to="{name: AdminRouteName.ARTICLES_DETAIL.name, params: {slug: slug}}">
      <i class="fas fa-arrow-left"></i>
    </b-button>
    {{slug}}
  </div>
</template>

<script>
import {AdminRouteName} from "@/helpers/enums.helper";

export default {
  name: "view.admin.articles.update",
  props: {
    slug: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      AdminRouteName,
    }
  },
}
</script>

<style scoped>

</style>