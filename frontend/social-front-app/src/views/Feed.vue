<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div v-for="item in articles" :key="item.articleId">
      <Article v-bind:title="item.title" v-bind:content="item.content" v-bind:user="item.user"/>
    </div>
  
  </div>
</template>

<script>
// @ is an alias to /src
import Article from "../components/Article.vue"
const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/feed/'
})

export default {
  name: 'Feed',
  data() {
    return {
      articles: []
    }
  },
  components: {
    Article
  },
  methods: {
    fetchArticles(){
      instance.get('/all')
      .then(response => {
        //console.log(response.data);
        for (let i in response.data){
          this.articles.push(response.data[i]);
        }
        console.log(this.articles);
      })
      .catch(error => console.log(error))
    }
  },
  beforeMount() {
    this.fetchArticles();

  }
}
</script>