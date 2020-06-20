<template>
  <div class="title">
    <h1>{{value}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: ['value']
}
</script>

<style lang="scss" scoped>
  .title {
    h1 {
      font-size: 100px;
      font-weight: 200;
      text-align: center;
      color: #fff;

      @media screen and (max-width: 670px) {
        font-size: 80px;
      }

       @media screen and (max-width: 440px) {
        font-size: 60px;
      }
    }
  }
</style>