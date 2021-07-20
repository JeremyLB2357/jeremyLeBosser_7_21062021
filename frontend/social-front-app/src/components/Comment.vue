<template>
    <div class="comment">
        <p>{{ content }}</p>
        <cite>rédigé par {{ user }} le {{ date }}</cite><span>- like {{ like }}</span>
    </div>  
</template>

<script>
export default {
    name: 'Comment',
    props: ['content', 'user', 'date', 'like']
}
</script>

<style scoped lang="scss">
$color1: #D68FD6;
$color-background-item: #DEFFF2;
$color3: #464F51;
$color-police: #000009;
$color2: #0FF4C6;

.comment {
    position: relative;
    bottom: 1rem;
    left: 2rem;
    background-color: $color-background-item;
    margin: 1rem auto 1rem auto;
    padding-bottom: 1rem;
    width: 40%;
    min-width: 15rem;
    border-radius: 5rem;
    border: 0.1rem solid $color1;
}
</style>