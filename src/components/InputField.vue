<template>
  <b-form-group :id="groupId"
                :label="label"
                :description="description"
                :label-for="labelForNameId">
    <b-form-input :id="labelForNameId"
                  v-model="vModel"
                  :name="labelForNameId"
                  :state="state"
                  :placeholder="placeholder"
                  :aria-describedby="ariaDescribedby">
    </b-form-input>
    <b-form-invalid-feedback>
      {{ error }}
    </b-form-invalid-feedback>
  </b-form-group>
</template>

<script>
export default {
  name: "InputField",
  props: {
    state: {
      type: Function
    },
    // $v.user.username.$model
    vModel: {},

    groupId: {
      type: String,
      default: 'example-input-group-1'
    },
    label: {
      type: String,
      default: 'Label'
    },
    description: {
      type: String,
      default: 'Description'
    },
    labelForNameId: {
      type: String,
      default: 'example-input-1'
    },
    placeholder: {
      type: String,
      default: ''
    },
    ariaDescribedby: {
      type: String,
      default: 'input-1-live-feedback'
    },
    error: {
      type: String,
      default: 'Error message'
    }
  }
}
</script>

<style scoped>

</style>