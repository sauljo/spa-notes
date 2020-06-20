<template>
  <div class="confirm_action">
    <div class="confirm_action__text">
      <h1>{{title}}</h1>
    </div>
    <div class="confirm_action__buttons">
      <general-button
        @click="UPD_STATUS_MODAL"
        class="confirm_action__button confirm_action__cancel"
        value='Нет'/>

      <general-button
        @click="onConfirm"
        class="confirm_action__button confirm_action__yes"
        value='Да'/>

    </div>
  </div>
</template>

<script>
import Button from '@/common/Button/Button.vue';
import { mapMutations, mapState, mapGetters } from 'vuex';

export default {
  name: 'ConfirmAction',
  components: {
    'general-button': Button
  },

  computed: {
    ...mapState({
      title: state => state.confirmAction.title,
      typeAction: state => state.confirmAction.typeAction,
      idNoteSelected: state => state.notes.idNoteSelected
    }),

  },
 
  methods: {
    ...mapMutations([
      'UPD_STATUS_MODAL',
      'DELETE_NOTE'
    ]),

    deleteNote() {
      this.DELETE_NOTE(this.idNoteSelected);
      if (this.$route.name === 'Edit') this.$router.push('/');
      this.UPD_STATUS_MODAL();
    },

    cancelEditNote() {
      this.$router.push('/');
      this.UPD_STATUS_MODAL();
    },

    onConfirm() {
      switch(this.typeAction) {
        case 'deleteNote':
          return this.deleteNote();
        case 'cancelEditNote':
          return this.cancelEditNote();
        default: {
          return;
        }
      }
    }

  }
}
</script>

<style lang="scss">
  @import './confirm-action.scss';
</style>