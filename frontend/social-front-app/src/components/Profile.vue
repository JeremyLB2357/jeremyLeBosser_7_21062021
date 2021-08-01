<template>
    <div class="profile">
        <h2>{{ lastName }} {{ firstName }}</h2>
        <p> Votre adresse email: {{ email }}</p>
        <div>
            <button class="btn" @click="changePassword">modifier vos infos</button>
        </div>
        <div v-if="modify == true">
            <p>Les champs vides ne sont pas pris en compte</p>
            <div class="input_content">
                <label for="newLastName">Nom: </label>
                <input type="text" v-model="newLastName" name="newLastName" id="newLastName">
            </div>
            <div class="input_content">
                <label for="newFirstName">Prénom: </label>
                <input type="text" v-model="newFirstName" name="newFirstName" id="newFirstName">
            </div>
            <div class="input_content">
                <label for="newEmail">Email: </label>
                <input type="text" v-model="newEmail" name="newEmail" id="newEmail">
            </div>
            <div class="input_content">
                <label for="newPassword">Mot de passe: </label>
                <input type="text" v-model="newPassword" name="newPassword" id="newPassword">
            </div>
            <button class="btn" @click="updateProfile">Envoyer les modifications</button>
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
            email: '',
            modify: false,
            newLastName: '',
            newFirstName: '',
            newEmail: '',
            newPassword: ''
        }
    },
    mounted() {
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/');
            return ;
        }
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('user')).token;
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
        },
        changePassword(){
            if (this.modify == false) {
                this.modify = true;
            } else {
                this.modify = false;
            }
        },
        updateProfile(){
            const newUser = new Object;
            if (this.newLastName !== ''){
                newUser.lastName = this.newLastName;
            }
            if (this.newFirstName !== ''){
                newUser.firstName = this.newFirstName;
            }
            if (this.newEmail !== ''){
                newUser.email = this.newEmail;
            }
            if (this.newPassword !== ''){
                newUser.password = this.newPassword;
            }
            //console.log('/profile/' + this.$store.state.user.userId);
            
            instance.put('/profile/' + this.$store.state.user.userId, newUser)
            .then(alert('les modifications ont été prises en compte'))
            .catch((error) => console.log(error))
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
.input_content {
  margin-bottom: 0.5rem;
}
</style>