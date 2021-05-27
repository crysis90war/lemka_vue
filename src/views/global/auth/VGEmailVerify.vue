<template>
  <div class="email_verify">
    <div class="d-flex justify-content-center">
      <div class="text-center my-5">
        <div>
          <b-alert variant="success" show="">Votre compte a été activé avec succès</b-alert>
          <router-link to="">Se connecter</router-link>
        </div>
        <div>
          <b-alert variant="danger" show="">Une erreur s'est produite lors d'activation</b-alert>
        </div>
      </div>
    </div>
    <pre style="white-space: pre-wrap">{{$route.query}}</pre>
  </div>
</template>

<script>
export default {
  name: "VGEmailVerify"
}
</script>

<style scoped>

</style>