<template>
  <div class="edit">
    <title-app value='Edit Note'/>
    <note
      :note="note"/>
  </div>
</template>

<script>

import Title from '@/components/Title/Title.vue';
import Note from '@/components/Note/Note.vue';
import { mapState } from 'vuex';

export default {
  name: 'Edit',
  components: {
    'title-app': Title,
    'note': Note
  },
  computed: {
    ...mapState({
      notes: state => state.notes.notes
    }),

    note() {
      const { id } = this.$route.params;
      return this.notes.find(item => item.id === id);
    }
  },

  mounted() {
    console.log(this.note);
    
  }
}
</script>


<style lang="scss" scoped>
  .edit {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
     background-color: #1f1f1f;

     > div {
       margin: 10px 0;
     }
  }
</style>