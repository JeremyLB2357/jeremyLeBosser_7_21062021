<template>
    <div class="login-content">
        <h2 v-if="mode == 'login'">Connexion</h2>
        <h2 v-else>Inscription</h2>
        <p v-if="mode == 'login'">Pas encore inscrit ? <span class="link-switch" @click="switchToCreatAccount">Créer un compte</span></p>
        <p v-else>Déjà inscrit ? <span class="link-switch" @click="switchToLogin">Se connecter</span></p>
        <div>
            <div v-if="mode == 'create'">
                <div class="form">
                    <input type="text" name="lastname" id="lastname" v-model="lastName" placeholder="Nom">
                </div>
                <div class="form">
                    <input type="text" name="firstname" id="firstname" v-model="firstName" placeholder="Prénom">
                </div>
            </div>
            <div class="form">
                <input type="email" name="email" id="email" v-model="email" placeholder="Adresse email">
            </div>
            <div class="form">
                <input type="text" name="password" id="password" v-model="password" placeholder="Votre mot de passe">
            </div>
            <div>
                <button class="btn" v-if="mode == 'login'" @click="login">Se connecter</button>
                <button class="btn" v-else @click="createAccount">S'inscrire</button>
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
        ...mapState(['status'])
    },
    methods: {
        switchToCreatAccount(){
            this.mode = 'create';
        },
        switchToLogin(){
            this.mode = 'login';
        },
        async createAccount(){
            await this.$store.dispatch('createAccount', {
                lastName: this.lastName,
                firstName: this.firstName,
                email: this.email,
                password: this.password
            })
            this.login();
        },
        async login(){
            
            await this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            })
            
            this.$router.push({name:'Feed'}, () => console.log('bien redirigé'), (error)=> console.log(error));
            
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

.login-content {
    background-color: $color-background-item;
    margin: auto;
    padding-bottom: 1rem;
    width: 50%;
    min-width: 20rem;
    border-radius: 5rem;
    border: 0.1rem solid $color1;
}
.link-switch {
    color: $color1;
    font-weight: bold;

    &:hover {
        cursor: pointer;
    }
}
.form {
    margin-bottom: 0.5rem;;
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
</style>