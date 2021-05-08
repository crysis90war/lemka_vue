<template>
  <b-form-group :label="switchType === true ? '' : label" :description="description">
    <b-form-checkbox v-if="switchType === true" v-model="inputVal" switch>
      <p>{{label}}</p>
    </b-form-checkbox>
    <b-form-input v-if="inputType === true" v-model="inputVal" :placeholder="placeholder" :state="state"/>
    <b-textarea v-if="textAreaType === true" v-model="inputVal" :placeholder="placeholder" :state="state"/>

    <b-form-invalid-feedback>
      <slot name="invalid-feedback"></slot>
    </b-form-invalid-feedback>

    <b-badge
        v-if="inputType === false && textAreaType === false && switchType === false"
        variant="warning">
      Faites votre choix entre :input-type="true" ou :text-area-type="true" ou :switch-type="true"
    </b-badge>
  </b-form-group>
</template>

<script>
export default {
  name: "LInputField",
  data() {
    return {}
  },
  props: {
    value: {},

    inputType: {
      type: Boolean,
      default: false
    },
    textAreaType: {
      type: Boolean,
      default: false
    },
    switchType: {
      type: Boolean,
      default: false
    },

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
    state: {
      type: Boolean,
      required: false
    }
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
  }
}
</script>

<style scoped>

</style>