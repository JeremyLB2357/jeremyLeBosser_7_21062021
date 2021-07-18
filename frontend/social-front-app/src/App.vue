<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/feed">Publications</router-link> |
    <router-link to="/pageperso">Mon profile</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
$color1: #D68FD6;
$color-background-item: #DEFFF2;
$color3: #464F51;
$color-police: #000009;
$color2: #0FF4C6;

body {
  background-color: $color3;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
