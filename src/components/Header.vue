<template>
  <div class="logo-header">
    <img alt="Vue logo" src="../assets/logo.png" class="my-2">
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
img {
  max-width: 390px;
}

.logo-header {
  text-align: center;
  /*background: linear-gradient(to bottom, #99bf54 0%, #FFFFFF 100%);*/

  background: #F1F1F1;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #B4A8BF, #F1F1F1);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #B4A8BF, #F1F1F1); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  /*background: #56ab2f;  !* fallback for old browsers *!*/
  /*background: -webkit-linear-gradient(to right, #a8e063, #56ab2f);  !* Chrome 10-25, Safari 5.1-6 *!*/
  /*background: linear-gradient(to right, #a8e063, #56ab2f); !* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ *!*/
}
</style>