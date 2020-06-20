<template>
  <div class="notes">
    <note
      v-for="note in notes"
      v-bind:key="note.id"
      :note="note"/>
  </div>
</template>

<script>

import { mapState, mapMutations, mapGetters } from 'vuex';
import Note from '../Note/Note.vue';

export default {
  name: 'Notes',
  components: {
    'note': Note
  },
  computed: {
    ...mapState({
      notes: state => state.notes.notes,
    }),
   
  },
}
</script>


