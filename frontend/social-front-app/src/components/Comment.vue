<template>
    <div class="comment">
        <p>{{ content }}</p>
        <cite>rédigé par {{ userComment }} le {{ date }}</cite><span>- like {{ likes }}</span>
        <button @click="like">logo jm</button>
        <button v-if="userComment == user.userId" @click="cancel">suppr</button>
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
    props: ['commentId', 'content', 'userComment', 'date', 'likes'],
    data() {
        return {
            userlike: false
        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        like(){
            if (this.userlike == true) {
                instance.post('/comment/like/' + this.commentId, {
                    like: 0
                })
            }
            if (this.userlike == false) {
                instance.post('/comment/like/' + this.commentId, {
                    like: 1
                })
            }
        },
        cancel(){
            instance.delete('comment/' + this.commentId)
            .then (alert('suppression réussie'))
            .catch (error => console.log(error))
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
    border: 0.1rem solid $color1;
}
</style>