<template>
  <b-button-group :size="size">
    <b-button variant="outline-success" :to="{name: route}">
      {{ create_message }}
    </b-button>
    <b-button variant="outline-primary" @click="loadOrRefreshFunc">
      <i class="fas fa-sync-alt"></i>
    </b-button>
  </b-button-group>
</template>
<script>
export default {
  name: 'create-refresh-button-group',
  props: {
    loadOrRefresh: {
      require: true
    },
    route: {
      required: true
    },
    create_message: {
      type: String,
      default: "Ajouter"
    },
    size: {
      type: String,
      default: "sm"
    }
  },
  methods: {
    loadOrRefreshFunc: function() {
      this.loadOrRefresh()
    }
  }
}
</script>
