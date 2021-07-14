<template>
    <div class="profile">
        <div>{{ lastName }}</div>
        <div>{{ firstName }}</div>
        <div>{{ email }}</div>
        <button @click="changePassword">modifier votre mot de passe</button>
        <button @click="disconnect">Se déconnecter</button>
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

</style>