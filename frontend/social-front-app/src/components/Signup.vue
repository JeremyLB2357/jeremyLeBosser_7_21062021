<template>
    <p>Pour vous inscrire, merci de renseigner le formulaire suivant</p>
    <form action="" class="signup">
        <label for="email">Votre adresse email</label>
        <input type="email" name="email" id="email">
        <label for="password">Votre mot de passe</label>
        <input type="text" name="password" id="password">
        <button>S'inscrire</button>
    </form>
</template>

<script>
export default {
    name: 'Signup'
}
</script>

<style scoped lang="scss">

</style>