<template>
  <div>
    <b-form-group :label="label" :description="description">
      <b-form-input v-model.trim="value"
                    :type="type"
                    :placeholder="placeholder"
                    :state="validateState"
                    @keyup="$emit('update:input', value)"/>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "LInput",
  props: {
    label: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    validateState: {},
    type: {
      type: String,
      default: "text"
    },
    input: String
  },
  data() {
    return {
      value: this.input
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>