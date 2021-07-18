<template>
    <div class="profile">
        <h2>{{ lastName }} {{ firstName }}</h2>
        <p> Votre adresse email: {{ email }}</p>
        <div>
            <button class="btn" @click="changePassword">modifier vos infos</button>
        </div>
        <div>
            <button class="btn" @click="disconnect">Se déconnecter</button>
        </div>
        
    </div>
</template>

<script>
const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
})

export default {
    name: 'Profile',
    data() {
        return {
            lastName: '',
            firstName: '',
            email: ''

        }
    },
    mounted() {
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/');
            return ;
        }
        instance.defaults.headers.common['Authorization'] = this.$store.state.user.token;
        instance.get(`/profile/${this.$store.state.user.userId}`)
        .then(response => {
            this.lastName = response.data.lastName;
            this.firstName = response.data.firstName;
            this.email = response.data.email;
        })
        .catch(error => console.log(error))

    },
    methods: {
        disconnect(){
            this.$store.dispatch('logout')
            .then(this.$router.push('/'))
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

.profile {
    background-color: $color-background-item;
    margin: auto;
    width: 50%;
    min-width: 20rem;
    border-radius: 5rem;
    border: 0.1rem solid $color1;
}
.btn {
    border-radius: 1rem;
    color: $color2;
    background-color: $color3;
    width: 8rem;
    height: 3rem;
    margin-bottom: 1rem;
    &:hover {
        color: $color1;
        cursor: pointer;
    }
}
</style>