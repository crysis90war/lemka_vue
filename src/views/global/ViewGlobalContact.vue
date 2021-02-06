<template>
  <b-container>
    <pre>{{user}}</pre>
  </b-container>
</template>

<script>
import UserModel from '@/models/user.model'
import UserApiService from "@/services/utilisateur";

export default {
  name: "ViewGlobalContact",
  data() {
    return {
      file: null,
      villes: [],
      user: new UserModel()
    }
  },

  computed: {
  },

  methods: {
    loopThroughObject(entry = {}) {
      for (const [key, value] of Object.entries(entry)) {
        console.log(`${key}${value}`);
      }
    },

    async assignToAnInstance() {
      await UserApiService.UserService.getUserDetail().then(response => {
        this.user = UserModel.from(response.data)
      })

      console.log(this.user)
    },

    async instanceMethod() {
      await UserApiService.UserService.getUserDetail().then(response => {
        this.user.applyData(response.data)
      })
      console.log(this.user)
    },

    async partOfTheConstructor() {
      await UserApiService.UserService.getUserDetail().then(response => {
        this.user = new UserModel(response.data)
      })
      console.log(this.user)
    }
  },

  created() {
    this.partOfTheConstructor()
  }
}
</script>

<style scoped>

</style>