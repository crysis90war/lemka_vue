<template>
  <div>
    <div class="container">
      <router-link :to="{ name: 'authLogin' }">Login</router-link>
      <router-link :to="{ name: 'authRegister' }">Register</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Index"
}
</script>

<style lang="scss">
.btn-grad {
  background-image: linear-gradient(to right, #834d9b 0%, #d04ed6 51%, #834d9b 100%);
  margin: 10px;
  text-align: center;
  text-transform: uppercase;
  background-size: 200% auto;
  color: white;
  border-radius: 20px;
  border: none;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  transition: transform 80ms ease-in;

  &:hover {
    background-position: right center;
    color: #fff;
    text-decoration: none;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
}
</style>