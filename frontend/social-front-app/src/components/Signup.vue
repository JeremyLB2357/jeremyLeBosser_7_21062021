<template>
    <form @submit.prevent="sendInscription">
        <label for="lastname">Votre nom</label>
        <input type="text" name="lastname" id="lastname" v-model="lastName">
        <label for="firstname">Votre prénom</label>
        <input type="text" name="firstname" id="firstname" v-model="firstName">
        <label for="email">Votre adresse email</label>
        <input type="email" name="email" id="email" v-model="email">
        <label for="password">Votre mot de passe</label>
        <input type="text" name="password" id="password" v-model="password">
        <button id="btn-signup">S'inscrire</button>
    </form>
</template>

<script>
const axios = require('axios').default;

export default {
    name: 'Signup',
    data() {
        return{
            lastName: '',
            firstName: '',
            email: '',
            password: '',
            info: ''
        }
    },
    methods: {
        sendInscription() {
            alert(this.lastName + ', vos informations ont bien été enregistrée !');
            axios.post('http://localhost:3000/api/auth/signup', {
                lastName: this.lastName,
                firstName: this.firstName,
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