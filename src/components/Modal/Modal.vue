<template>
  <transition name="fade">
    <div v-if="status" class="overlay">
      <div @click="UPD_STATUS_MODAL" class="overlay__close">
        <i class="fas fa-times"></i>
      </div>
      <component v-bind:is="component"></component>
    </div>
  </transition>
</template>

<script>


import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Modal',

  computed: {
    ...mapState({
      status: state => state.modal.status,
      component: state => state.modal.component
    })
  },

  methods: {
    ...mapMutations(['UPD_STATUS_MODAL'])
  }
}
</script>

<style lang="scss">
  @import './modal.scss';
</style>