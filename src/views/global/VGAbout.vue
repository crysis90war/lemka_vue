<template>
  <div class="about">
    <b-container>
      <h1 class="text-center">This is an about page</h1>
      <LInput :input.sync="car.brand" label="Label" description="Description" placeholder="placeholder ..."></LInput>
      <LInput :input.sync="car.model" label="Label" description="Description" placeholder="placeholder ..."></LInput>
      <b-form-datepicker v-model="car.year" :date-format-options="{ year: 'numeric', month: 'numeric' }" locale="fr"/>

      <pre>{{ car }}</pre>

    </b-container>

  </div>
</template>

<script>
import {htmlTitle} from "@/utils/tools";
import LInput from "@/components/form/LInput";

export default {
  name: 'VGAbout',
  components: {
    LInput

  },
  title() {
    return htmlTitle('À propos')
  },
  data() {
    return {
      car: {
        brand: null,
        model: null,
        year: null
      }
    }
  },
  methods: {
  },
}
</script>