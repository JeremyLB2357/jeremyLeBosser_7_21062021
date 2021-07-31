<template>
  <div class="transition">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>Je suis en plein chargement</p>
  </div>
</template>

<script>

export default {
    name: 'Transition',
    methods: {
        /*redirectToFeed(){
            this.$router.push({name:'Feed'}, () => console.log('bien redirigé'), (error)=> console.log(error));
        }*/
    },
    mounted(){
        this.$router.push({name:'Feed'});
    }
}



</script>

<style scoped lang="scss">
$color1: #D68FD6;
$color-background-item: #DEFFF2;
$color3: #464F51;
$color-police: #000009;
$color2: #0FF4C6;

</style>