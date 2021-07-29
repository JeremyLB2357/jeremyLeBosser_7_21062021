<template>
    <div class="article">
        <h2>{{ title }} - like {{ likes }}</h2>
        <p>{{ content }}</p>
        <cite>rédigé par {{ userArticle }} le {{ date }}</cite>
        <button @click="like"><i class="fas fa-heart"></i></button>
        <button v-if="userArticle == user.userId" @click="cancel"><i class="fas fa-trash-alt"></i></button>
        <div class="form">
            <p>Envie de commenter ?</p>
            <div class="input_content">
                <textarea v-model="newComment.content" name="new_com" id="new_com"></textarea>
            </div>
          <button class="btn" @click="commentArticle">Commentez !</button>
    </div>
    </div>
</template>

<script>
const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/feed/'
})

import { mapState } from 'vuex';

export default {
    name: 'Article',
    props: ['articleId', 'title', 'content', 'userArticle', 'date', 'likes'],
    data() {
        return {
            userlike: false,
            newComment : { content: 'Votre commentaire ici', articleId: this.articleId }
        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        like(){
            if (this.userlike == true) {
                instance.post('/article/like/' + this.articleId, {
                    like: 0
                })
            }
            if (this.userlike == false) {
                instance.post('/article/like/' + this.articleId, {
                    like: 1
                })
            }
        },
        cancel(){
            instance.delete('article/' + this.articleId)
            .then (alert('suppression réussie'))
            .catch (error => console.log(error))
        },
        commentArticle(){
            instance.post('comment/', this.newComment)
        }
    }
}
</script>

<style scoped lang="scss">
$color1: #D68FD6;
$color-background-item: #DEFFF2;
$color3: #464F51;
$color-police: #000009;
$color2: #0FF4C6;

.article {
    background-color: $color-background-item;
    margin: 1rem auto 1rem auto;
    padding-bottom: 1rem;
    width: 50%;
    min-width: 20rem;
    border-radius: 5rem;
    border: 0.1rem solid $color1;
}
</style>