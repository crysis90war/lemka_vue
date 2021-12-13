<template>
  <div class="email_verify">
    <div class="d-flex justify-content-center">
      <div class="text-center my-5">
        <h3>Activation du compte</h3>
        <div v-if="$route.query.token_valid === 'True'">
          <b-alert variant="success" show="">{{ $route.query.message }}</b-alert>
          <router-link :to="{name: 'VGLogin'}">Se connecter</router-link>
        </div>
        <div v-else>
          <b-alert variant="danger" show="">{{ $route.query.message }}</b-alert>
        </div>
      </div>
    </div>
<!--    <pre style="white-space: pre-wrap">{{$route.query}}</pre>-->
  </div>
</template>

<script>
export default {
  name: "EmailVerify"
}
</script>

<style scoped>

</style>