<template>
  <div>
    {{gameInfo}}
  </div>
</template>

<script>
export default {
  name: "GameInfo",
  data () {
    return {
      gameInfo : null
    }
  },
  created() {
    this.gameInfo = this.$route.params;
    console.log(this.gameInfo);
  },
}
</script>

<style scoped>

</style>