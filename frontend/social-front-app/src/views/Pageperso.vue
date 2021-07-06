<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png">
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
  }
}
</script>