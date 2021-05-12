<template>
  <ul class="list-inline">
    <li class="list-inline-item" v-if="facebook !== ''">
      <b-link :href="facebook" target="_blank">
        <i class="fab fa-facebook-square fa-2x"> </i>
      </b-link>
    </li>
    <li class="list-inline-item" v-if="twitter !== ''">
      <a :href="twitter">
        <i class="fab fa-twitter-square fa-2x"></i>
      </a>
    </li>
    <li class="list-inline-item" v-if="linkedin !== ''">
      <a :href="linkedin">
        <i class="fab fa-linkedin fa-2x"></i>
      </a>
    </li>
    <li class="list-inline-item" v-if="instagram !== ''">
      <b-link :href="instagram" target="_blank">
        <i class="fab fa-instagram-square fa-2x"></i>
      </b-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Social',
  props: {
    facebook: {
      type: String,
      default: ""
    },
    twitter: {
      type: String,
      default: ""
    },
    linkedin: {
      type: String,
      default: ""
    },
    instagram: {
      type: String,
      default: ""
    }
  }
}
</script>
