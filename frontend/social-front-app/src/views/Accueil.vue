<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Article title="mon titre" content="je rédige un article trop cool" user="master"/>
    <Article title="mon titre2" content="il est vraiment fun !" user="user122"/>
    <Article title="mon titre3" content="je kiff js" user="use357"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Article from "../components/Article.vue"


export default {
  name: 'Home',
  components: {
    Article
  }
}
</script>