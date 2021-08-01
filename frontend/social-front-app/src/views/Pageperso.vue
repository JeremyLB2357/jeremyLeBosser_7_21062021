<template>
  <div>
    <img class="logo" alt="Vue logo" src="../assets/icon-above-font.svg">
    <Profile/>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Profile from "../components/Profile.vue"

export default {
  name: 'Pageperso',
  components: {
    Profile
  },
  data() {
    return {
      
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

.logo {
  max-width: 10em;
  max-height: 10em;
}
</style>