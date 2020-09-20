<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotulist"
                     :key="item.id">
        <img :src="item.img"
             alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  props: ["lunbotulist"]
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 150px;

  .mint-swipe-item {
    &:nth-child(1) {
      background-color: red;
    }
    &:nth-child(2) {
      background-color: blue;
    }
    &:nth-child(3) {
      background-color: pink;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>