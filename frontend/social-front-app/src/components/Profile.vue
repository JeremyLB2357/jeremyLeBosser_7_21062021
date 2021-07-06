<template>
    <div class="profile">
        <ul>
            <li>Nom</li>
            <li>Prémon</li>
            <li>Mail</li>
            <li>Info: {{ info }}</li>
        </ul>
    </div>
</template>

<script>
const axios = require('axios').default;

export default {
    name: 'Profile',
    data() {
        return {
            info: null
        }
    },
    mounted() {
        axios
            .get('http://localhost:3000/api/profile/me?id=67bb971a-673b-4240-9b1d-67080d4dc915')
            .then(response => (this.info = response))
    }
}
</script>

<style scoped lang="scss">

</style>