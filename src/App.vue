<template>
  <div id="app">
    <router-view/>
    <modal/>
  </div>
</template>

<script>

import Modal from './components/Modal/Modal.vue';

export default {
  name: 'App',
  components: {
    'modal': Modal
  }
}
</script>

<style lang="scss">
  @import './scss/index.scss';
</style>
