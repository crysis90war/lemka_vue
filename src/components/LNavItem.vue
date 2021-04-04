<template>
  <b-nav-item :to="href">
    <i :class="icon"></i> {{ title }} <b-badge pill variant="danger">{{notification}}</b-badge>
  </b-nav-item>
</template>

<script>
export default {
  name: "LNavItem",
  props: {
    href: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    notification: {
      type: String,
      default: ""
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
  }

  &:focus {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
  }
}
</style>