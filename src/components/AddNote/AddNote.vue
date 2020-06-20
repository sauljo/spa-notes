<template>
  <div class="add-note">
    <general-button @click="addNote" value='Добавить'/>
  </div>
</template>

<script>

import Button from '@/common/Button/Button';
import Note from '../Note/Note';

import { mapState, mapMutations } from 'vuex';
export default {
  name: 'AddNote',
  components: {
    'general-button': Button
  },

  computed: {
  
  },

  methods: {
    ...mapMutations([
      'UPD_STATUS_MODAL',
      'SET_COMPONENT',
      'SET_CONFIRM_ACTIONS_PROPS']),

    addNote() {
      this.UPD_STATUS_MODAL();
      this.SET_COMPONENT(Note);
    }
  }
}
</script>

<style lang="scss" scoped>
  .add-note__button:hover {
    background-color: #0d7eff;
  }
</style>