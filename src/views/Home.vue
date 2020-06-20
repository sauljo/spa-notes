<template>
  <div class="home"
    v-bind:style="{'justify-content': notes.length ? 'flex-start' : 'center' }">
    <title-app value='Notes'/>
    <add-note/>
    <notes/>
  </div>
</template>

<script>

import Title from '@/components/Title/Title.vue';
import AddNote from '@/components/AddNote/AddNote.vue';
import Notes from '@/components/Notes/Notes.vue';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    'title-app': Title,
    'add-note': AddNote,
    'notes': Notes
  },

  computed: {
    ...mapState({
      notes: state => state.notes.notes
    })
  }
}
</script>


<style lang="scss" scoped>
  .home {
    display: flex;
    flex-direction: column;
    /*background-color: #37a9fa;*/
    background-color: #5fdec0;
    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 10px 0;
    }
  }
</style>