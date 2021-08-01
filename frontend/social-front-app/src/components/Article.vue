<template>
    <div class="article">
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
        <div v-if="imageUrl !== null"><img v-bind:src="imageUrl"></div>
        <cite>rédigé par {{ userArticle }} le {{ dateFormatee }}</cite>
        <div>
            <button class="btn-interne" @click="like">{{ likes }} <i class="fas fa-heart"></i></button>
            <button class="btn-interne" v-if="userId == user.userId || $store.state.rigth == 'admin'" @click="cancel"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="form">
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
    props: ['articleId', 'title', 'content', 'imageUrl', 'userArticle', 'date', 'likes', 'arrayOfLikes', 'userId'],
    data() {
        return {
            userlike: false,
            newComment : { content: 'Votre commentaire ici', articleId: this.articleId },
        }
    },
    computed: {
        ...mapState(['user']),
        dateFormatee() {
            const date = this.date;
            const newDate = date.split('T')[0].split('-')[2] + '/' + date.split('T')[0].split('-')[1] + '/' + date.split('T')[0].split('-')[0]
      + ' à ' + date.split('T')[1].split(':')[0] + 'h' + date.split('T')[1].split(':')[1];
      return newDate
        }
    },
    methods: {
        like(){
            if (this.userlike == true) {
                instance.post('/article/like/' + this.articleId, {
                    like: 0
                })
                .then(()=> {
                    this.$router.push({name:'Transition'}, () => console.log('bien redirigé'), (error)=> console.log(error));
                })
            }
            if (this.userlike == false) {
                instance.post('/article/like/' + this.articleId, {
                    like: 1
                })
                .then(()=> {
                    this.$router.push({name:'Transition'}, () => console.log('bien redirigé'), (error)=> console.log(error));
                })
            }
        },
        cancel(){
            instance.delete('/article/' + this.articleId)
            .then (alert('suppression réussie'))
            .then(()=> {
                    this.$router.push({name:'Transition'}, () => console.log('bien redirigé'), (error)=> console.log(error));
                })
            .catch (error => console.log(error))
        },
        commentArticle(){
            instance.post('/comment/', this.newComment)
            .then(()=> {
                this.$router.push({name:'Transition'}, () => console.log('bien redirigé'), (error)=> console.log(error));
            })
            .catch(error => console.log(error))
        },
        
    },
    mounted(){
        instance.defaults.headers.common['Authorization'] = 'BEARER '+ this.user.token;
        if(this.arrayOfLikes !== null ){
            const arrayUser = this.arrayOfLikes.split(',');
            for (let i in arrayUser){
                if(arrayUser[i] == this.user.userId){
                    this.userlike = true;
                }
            }
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
    padding: 0 2rem 1rem 2rem;
    width: 50%;
    min-width: 20rem;
    border-radius: 5rem;
    border: 0.2rem solid $color1;
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
.btn-interne {
    color: $color2;
    background-color: $color3;
    margin: 0.4em;
    border-radius: 5rem;
    width: 3rem;
    height: 2rem;
    &:hover {
        color: $color-background-item;
    }
}

cite {
    font-size: 0.8rem;
}
img {
    width: 15em;
    height: 15em;
}
</style>