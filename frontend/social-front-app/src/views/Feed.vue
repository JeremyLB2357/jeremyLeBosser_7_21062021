<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="form">
      <p>Envie de partager quelque chose ?</p>
      <div class="input_content">
        <input type="text" v-model="newArticle.title" name="new_title" id="new_title">
      </div>
          <div class="input_content">
            <textarea v-model="newArticle.content" name="new_content" id="new_content"></textarea>
          </div>
          <button class="btn" @click="postArticle">Poster !</button>
        </div>
    <div v-for="item in articles" :key="item.articleId">
      <Article v-bind:title="item.title" v-bind:content="item.content" v-bind:user="item.user" v-bind:date="item.updatedAt" v-bind:like="item.likes"/>
      <div v-for="elem in item.Comments" :key="elem.commentId">
        <Comment v-bind:commentId="elem.commentId" v-bind:content="elem.content" v-bind:userComment="elem.user" v-bind:date="elem.updatedAt" v-bind:like="elem.likes"/>
      </div>
    </div>
    
  
  </div>
</template>

<script>
// @ is an alias to /src
import Article from "../components/Article.vue";
import Comment from "../components/Comment.vue";

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/feed/'
})

export default {
  name: 'Feed',
  data() {
    return {
      articles: [],
      newArticle: { title: 'Mon titre', content: 'Que voulez-vous poster ?' }
    }
  },
  components: {
    Article,
    Comment
  },
  methods: {
    fetchArticles(){
      instance.get('/all')
      .then(response => {
        for (let i in response.data){
          this.articles.push(response.data[i]);
        }
      })
      .catch(error => console.log(error))
    },
    postArticle(){
      instance.post('/publish', this.newArticle)
      .then(this.$router.push('/feed'))
      .catch(error => console.log(error))
    }
  },
  created() {
    
  },
  mounted() {
    if (this.$store.state.user.userId == -1) {
            this.$router.push('/');
            return ;
        }
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('user')).token;
    this.fetchArticles();
  }
}
</script>

<style scoped lang="scss">
$color1: #D68FD6;
$color-background-item: #DEFFF2;
$color3: #464F51;
$color-police: #000009;
$color2: #0FF4C6;

.form {
    background-color: $color-background-item;
    margin: auto;
    padding-bottom: 1rem;
    padding-top: 1rem;
    width: 50%;
    min-width: 20rem;
    border-radius: 5rem;
    border: 0.1rem solid $color1;
    margin-bottom: 0.5rem;;
}
.input_content {
  margin-bottom: 0.5rem;
}
#new_content {
  width: 90%;
  height: 5rem;
}
.btn {
    border-radius: 1rem;
    color: $color2;
    background-color: $color3;
    width: 8rem;
    height: 3rem;
    &:hover {
        color: $color1;
        cursor: pointer;
    }
}
</style>