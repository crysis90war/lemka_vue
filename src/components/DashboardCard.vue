<template>
  <b-card>
    <template v-slot:header>
      <i :class="icon"></i>
      <span> {{ route_value }}</span>
    </template>

    <b-card-text>
      <b-link :to="{name: route_link}">{{ count }} {{ message }}</b-link>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "DashboardCard",
  props: {
    icon: {
      type: String,
      default: ''
    },
    route_value: {
      type: String,
      default: ''
    },
    route_link: {
      type: String,
      default: ''
    },
    count: {
      type: Number,
      default: 0
    },
    message: {
      type: String,
      default: ''
    }
  },
}
</script>

<style scoped>

</style>