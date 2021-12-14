<template>
  <div id="app">
    <v-app>
    <navbar/>
    <router-view/>
    </v-app>
  </div>
</template>
<script>
import AuthService from './services/Auth.js'
import Navbar from "@/components/Navbar.vue"
export default {
  components: {
    Navbar
  },
  created() {
    AuthService.checkAuth().catch(() => {
      this.$router.push('/login')
    })
  },
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
