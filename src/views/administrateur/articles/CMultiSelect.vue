<template>
  <b-form-group
      :label="label"
      :description="description"
  >
    <multiselect
        v-model="inputVal"
        :options="options"
        :allow-empty="false"
        :show-labels="false"
        label="nom"
        track-by="nom"
        :class="{ 'invalid': invalid }"
        @close="onTouched"
    >
      <span slot="noResult">Oups! Aucun élément trouvé. Pensez à modifier la requête de recherche.</span>
    </multiselect>
    <span class="text-danger" v-show="invalid"><small>Ce champ est requis</small></span>
  </b-form-group>
</template>

<script>
export default {
  name: "CMultiSelect",
  props: {
    label: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    options: {},
    invalid: {},
    value: {}
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  methods: {
    onTouched: function() {
      this.$emit('touched')
    }
  }
}
</script>

<style scoped>

</style>