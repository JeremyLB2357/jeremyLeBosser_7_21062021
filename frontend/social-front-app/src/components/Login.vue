<template>
    <form @submit.prevent="sendLoginInfo">
        <label for="email">Votre adresse email</label>
        <input type="email" name="email" id="email" v-model="email">
        <label for="password">Votre mot de passe</label>
        <input type="text" name="password" id="password" v-model="password">
        <button>Se connecter</button>
    </form>
</template>

<script>
const axios = require('axios').default;

export default {
    name: 'Login',
    data() {
        return{
            email: '',
            password: '',
            info: ''
        }
    },
    methods: {
        sendLoginInfo() {
            axios.post('http://localhost:3000/api/auth/login', {
                email: this.email,
                password: this.password
            })
            .then(response => {
                this.info = response;
            })
            .catch(error => console.log(error))
        }
    }
}
</script>

<style scoped lang="scss">

</style>