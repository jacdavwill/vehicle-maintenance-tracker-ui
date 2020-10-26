<template>

</template>

<script>
export default {
  mounted() {
    this.$store.state.userAuthToken = undefined
    this.$router.push('/')
  }
}
</script>

