<template>
  <v-app-bar app color="black" dark>
      <v-btn text>
        <router-link to="/" class="text-decoration-none"
          ><v-btn dark depressed text > Home</v-btn></router-link
        >
      </v-btn>
      <v-btn text>
        <router-link to="/" class="text-decoration-none"
          ><v-btn text><span class="mr-2">User Setting</span></v-btn></router-link
        >
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn text @click="changeLanguage">
        <span class="mr-2">Change Language</span>
      </v-btn>
      <span>{{locale}}</span>
    </v-app-bar>
</template>

<script>
export default {
  computed:{
    locale(){
      return this.$i18n.locale.toUpperCase();
    }
  },
  methods:{
    changeLanguage(){
      let language = localStorage.getItem('locale')
      if(!language || language === 'en'){
        localStorage.setItem('locale','tr')
        this.$i18n.locale = 'tr'
      }
      else{
        localStorage.setItem('locale','en')
        this.$i18n.locale = 'en'
      }
    }
  }
  }
</script>

<style>

</style>