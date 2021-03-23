<template>
  <b-card class="rounded-card shadow p-3 bg-white my-4 border-0">
    <b-row>
      <b-col lg="6">
        <b-avatar size="3em" class="mr-4"></b-avatar>
        <span>{{ username }}</span>
      </b-col>
      <b-col lg="6">
        <b-form-rating :value="value" show-value precision="1" no-border variant="warning" readonly></b-form-rating>
      </b-col>
    </b-row>
    <b-card-body>
      <b-card-text>
        <p>{{ message }}</p>
      </b-card-text>
    </b-card-body>
  </b-card>
</template>
<script>

export default {
  name: 'l-review-card',
  props: {
    username: {
      type: String,
      default: "Username"
    },
    value: {
      type: Number,
      default: 4.5
    },
    message: {
      type: String,
      default: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cum error facilis officia! Cumque dicta dignissimos dolore, earum eius explicabo fuga laborum maxime, molestias placeat, provident quis quo temporibus! Eligendi."
    }
  }
}
</script>
<style lang="scss" scoped>
.rounded-card {
  border-radius: 20px;
}

.carousel-3d-container {
  figcaption {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    bottom: 0;
    padding: 15px;
    min-width: 100%;
    box-sizing: border-box;
  }
}
</style>