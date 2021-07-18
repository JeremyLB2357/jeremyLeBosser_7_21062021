<template>
    <div class="article">
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
        <p>rédigé par {{ user }}</p>
    </div>
</template>

<script>
export default {
    name: 'Article',
    props: ['title', 'content', 'user']
}
</script>

<style scoped lang="scss">
$color1: #D68FD6;
$color-background-item: #DEFFF2;
$color3: #464F51;
$color-police: #000009;
$color2: #0FF4C6;

.article {
    background-color: $color-background-item;
    margin: 1rem auto 1rem auto;
    padding-bottom: 1rem;
    width: 50%;
    min-width: 20rem;
    border-radius: 5rem;
    border: 0.1rem solid $color1;
}
</style>