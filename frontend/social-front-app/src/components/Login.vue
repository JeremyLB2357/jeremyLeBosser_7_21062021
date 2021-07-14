<template>
    <div>
        <h2 v-if="mode == 'login'">Connexion</h2>
        <h2 v-else>Inscription</h2>
        <p v-if="mode == 'login'">Pas encore inscrit ? <span @click="switchToCreatAccount">Créer un compte</span></p>
        <p v-else>Déjà inscrit ? <span @click="switchToLogin">Se connecter</span></p>
        <div>
            <div v-if="mode == 'create'">
                <input type="text" name="lastname" id="lastname" v-model="lastName" placeholder="Nom">
                <input type="text" name="firstname" id="firstname" v-model="firstName" placeholder="Prénom">
            </div>
            <div>
                <input type="email" name="email" id="email" v-model="email" placeholder="Adresse email">
            </div>
            <div>
                <input type="text" name="password" id="password" v-model="password" placeholder="Votre mot de passe">
            </div>
            <div>
                <button v-if="mode == 'login'" @click="login">Se connecter</button>
                <button v-else @click="createAccount">S'inscrire</button>
            </div>
            <p v-if="mode == 'login' && status == 'error_login'">adresse mail ou mot de passe invalide</p>
            <p v-if="mode == 'create' && status == 'error_create'">adresse mail déjà utilisée</p>
            
        </div>
    </div>
    
</template>

<script>

import { mapState } from 'vuex';

export default {
    name: 'Login',
    data() {
        return{
            mode: 'login',
            lastName: '',
            firstName: '',
            email: '',
            password: ''
        }
    },
    computed: {
        ...mapState([status])
    },
    methods: {
        switchToCreatAccount(){
            this.mode = 'create';
        },
        switchToLogin(){
            this.mode = 'login';
        },
        createAccount(){
            this.$store.dispatch('createAccount', {
                lastName: this.lastName,
                firstName: this.firstName,
                email: this.email,
                password: this.password
            })
            .then(() => {
                this.login();
            })
        },
        login(){
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            })
            .then(this.$router.push('/accueil'))
        }
    }
}
</script>

<style scoped lang="scss">

</style>