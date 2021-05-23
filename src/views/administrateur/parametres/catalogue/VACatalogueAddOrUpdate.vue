<template>
  <div class="add_or_update_catalogue">
    <pre>{{catalogue}}</pre>
  </div>
</template>

<script>
import {validationMixin} from "vuelidate";
import {validationMessageMixin} from "@/mixins/validation_message.mixin";
import {commonMixin} from "@/mixins/common.mixin";
import {htmlTitle} from "@/utils/tools";
import LemkaHelpers from "@/helpers";
import CatalogueModel from "@/models/catalogue/catalogue.model";

export default {
  name: "VACatalogueAddOrUpdate",
  mixins: [validationMixin, validationMessageMixin, commonMixin],
  title() {
    return htmlTitle('Catalogue');
  },
  data() {
    return {
      catalogue: new CatalogueModel(),
      BSClass: LemkaHelpers.BSClass,
      routes: LemkaHelpers.Routes
    }
  },
}
</script>

<style scoped>

</style>