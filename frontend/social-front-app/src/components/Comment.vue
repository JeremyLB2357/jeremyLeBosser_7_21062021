<template>
    <div class="comment">
        <p>{{ content }}</p>
        <cite>rédigé par {{ userComment }} le {{ dateFormatee }}</cite>
        <div>
            <button class="btn-interne" @click="like">{{ likes }} <i class="fas fa-heart"></i></button>
            <button class="btn-interne" v-if="userComment == user.userId || $store.state.rigth == 'admin'" @click="cancel"><i class="fas fa-trash-alt"></i></button>
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
    name: 'Comment',
    props: ['commentId', 'content', 'userComment', 'date', 'likes', 'arrayOfLikes'],
    data() {
        return {
            userlike: false
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
                instance.post('/comment/like/' + this.commentId, {
                    like: 0
                })
                .then(()=> {
                    this.$router.push({name:'Transition'}, () => console.log('bien redirigé'), (error)=> console.log(error));
                })
            }
            if (this.userlike == false) {
                instance.post('/comment/like/' + this.commentId, {
                    like: 1
                })
                .then(()=> {
                    this.$router.push({name:'Transition'}, () => console.log('bien redirigé'), (error)=> console.log(error));
                })
            }
        },
        cancel(){
            instance.delete('/comment/' + this.commentId)
            .then (alert('suppression réussie'))
            .then(()=> {
                    this.$router.push({name:'Transition'}, () => console.log('bien redirigé'), (error)=> console.log(error));
                })
            .catch (error => console.log(error))
        }
    },
    mounted(){
        instance.defaults.headers.common['Authorization'] = 'BEARER ' + this.user.token;
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

.comment {
    position: relative;
    bottom: 1rem;
    left: 2rem;
    background-color: $color-background-item;
    margin: 1rem auto 1rem auto;
    padding-bottom: 1rem;
    width: 40%;
    min-width: 15rem;
    border-radius: 5rem;
    border: 0.2rem solid $color1;
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
</style>