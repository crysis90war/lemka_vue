<template>
  <b-container>
    <div class="d-flex justify-content-center mt-5">
      <b-nav tabs fill class="w-50">
        <b-nav-item :to="{ name: 'authLogin' }" :active="$route.name === 'authLogin'" class="link-secondary">
          S'IDENTIFIER
        </b-nav-item>
        <b-nav-item :to="{ name: 'authRegister' }" :active="$route.name === 'authRegister'" class="link-secondary">
          S'ENREGISTRER
        </b-nav-item>
      </b-nav>
    </div>

    <router-view></router-view>
  </b-container>
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