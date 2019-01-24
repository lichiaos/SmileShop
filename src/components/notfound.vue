<template>
  <div class="notfound">
    <img src="../assets/404.jpg" alt="">
    <div class="link">
      <a class="back" @click="$router.go(-1)"></a>
      <router-link to="/home" class="goHome"></router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
  }
}
</script>

<style lang='scss' scoped>
  .notfound {
    z-index: 100;
    overflow-y: hidden;
    position: relative;
    img {
      height: 35rem;
      width: 100%;
    }
    .link {
      position: absolute;
      top: 63%;
      display: flex;
      .back {
        display: block;
        width: 4rem;
        height: 1rem;
        margin-left: 6rem;
      }
      .goHome {
        display: block;
        width: 4rem;
        height: 1rem;
        margin-left: 2rem;
      }
    }
  }
</style>
