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

</style>