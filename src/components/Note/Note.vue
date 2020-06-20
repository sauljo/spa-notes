<template>
  <div class="note">

    <div class="note__name">
      <general-input :error="error" v-model="suitableNote.name" v-if="canEditNote || canAddNote" size='small' placeholder='Название заметки'/> 
      <span v-else>{{ suitableNote.name }}</span>

      <div class="note__actions">

        <div @click="$router.push(suitableNote.id)" v-if="!canAddNote && !canEditNote" title="Изменить заметку" class="note__actions__edit">
            <i class="fas fa-highlighter"></i>
        </div>

        <div @click="deleteNote(suitableNote.id)" v-if="!canAddNote" title="Удалить заметку" class="note__actions__delete">
          <i class="fas fa-trash"></i>
        </div>
      </div>

    </div>

    <div v-if="canEditNote || canAddNote" class="note__add_todo">
      <form @submit.prevent="addTodo">
        <general-input required v-model="nameTodo" size='small' placeholder="Добавить дело" />
        <general-button size='small' value='Добавить'/>
      </form>
    </div>

    <div class="note__todos">
      <todo 
        v-for="todo in !canAddNote && !canEditNote && todosShown ? shortTodos : todos"
        :canEditNote="canEditNote"
        :canAddNote="canAddNote"
        :todos="todos"
        :todo="todo"
        v-bind:key="todo.id"
        :toogleTodo="toogleTodo"
        :deleteTodo="deleteTodo"/> 

      <div v-if="!todos.length" class="note__todos__empty">
        <span>{{messageEmptyTodos}}</span>
      </div>
    </div>

    <div
      v-if="canShortTodos"
      class="note__todos-show-all"
      @click="todosShown = !todosShown">
      <span 
        v-if="todosShown">
        Показать список</span>
      <span
        v-else>
         Скрыть</span>
    </div>

    <div class="note__panel">
      <div class="note__panel__count">
        <span>Осталось дел: {{ countActiveTodos }}</span>
      </div>
      <div class="note__panel__filter">
        <span @click="suitableNote.filter = 'all'" v-bind:class="{'active' : suitableNote.filter === 'all'}">Все</span>
        <span @click="suitableNote.filter = 'active'" v-bind:class="{'active' : suitableNote.filter === 'active'}">Активные</span>
        <span @click="suitableNote.filter = 'completed'" v-bind:class="{'active' : suitableNote.filter === 'completed'}">Завершённые</span>
      </div> 
    </div> 

    <div v-if="canAddNote || canEditNote" class="note__actions">
      <general-button v-if="canAddNote" @click="UPD_STATUS_MODAL" size='small' value='Отмена'/>
      <general-button v-if="canEditNote" @click="cancelEditNote" size='small' value='Отменить редактирование'/>
      <general-button @click="saveNote" size='small' value='Сохранить'/>
    </div>
  </div>
</template>

<script>

import { mapState, mapMutations, mapGetters } from 'vuex';

import Input from '@/common/Input/Input.vue';
import Button from '@/common/Button/Button.vue';
import Todo from '../Todo/Todo';
import ConfirmAction from '../ConfirmAction/ConfirmAction';

import { deepCopy } from '@/utils/common';

import shortid from 'shortid';

export default {
  name: 'Note',
  components: {
    'general-input': Input,
    'general-button': Button,
    'todo': Todo
  },

  props: {
    note: {
      required: false,
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    ...mapState({
      notes: state => state.notes.notes,
      preNote: state => state.note.preNote
    }),

    idEdit() {
      const { id } = this.$route.params;
      return id || null;
    },

    canEditNote() {
      if (this.idEdit) return true;
      else return false;
    },

    canAddNote() {
      if (!this.note.id && !this.canEditNote) return true;
      else return false;
    },

    suitableNote() {
      if (this.canEditNote || this.canAddNote) {
        return this.preNote;
      } else return this.note;
    },

    todos() {
      switch(this.suitableNote.filter) {
        case 'active':
          const actives = this.suitableNote.todos.filter(item => !item.checked); 
          return actives
        case 'completed':
          const completed = this.suitableNote.todos.filter(item => item.checked);
          return completed;
        default: 
          return this.suitableNote.todos;
      }
    },

    shortTodos() {
      return this.todos.slice(0, this.countShortTodos);
    },

    canShortTodos() {
      if (!this.canEditNote && !this.canAddNote && this.shortTodos.length < this.todos.length) {
        return true;
      } else return;
    },

    messageEmptyTodos() {
      switch(this.suitableNote.filter) {
        case 'active':
          if (!this.todos.length) {
            return 'Активных задач нет'
          }
        case 'completed':
          if (!this.todos.length) {
            return 'Завершённых задач нет'
          }
        default: 
          return 'Создайте задачу'
      }
    },

    countActiveTodos() {
      return this.suitableNote.todos.filter(item => !item.checked).length;
    },
  },

  data() {
    return {
      nameTodo: '',
      error: false,
      countShortTodos: 5,
      todosShown: true
    }
  },

  created() {
    console.log(this.canEditNote, this.canAddNote, this.note.name);
    
    if (this.canEditNote || this.canAddNote) {
      this.setPreNote();
    }
  },


  methods: {
    ...mapMutations([
      'SAVE_NOTE',
      'UPD_STATUS_MODAL',
      'DELETE_NOTE',
      'SET_COMPONENT',
      'SET_CONFIRM_ACTIONS_PROPS',
      'ID__NOTE_SELECTED',
      'SET_PRE_NOTE',
      'UPD_PRE_NOTE'
    ]),

    deleteNote(id) {
      this.UPD_STATUS_MODAL();
      this.ID__NOTE_SELECTED(id)
      this.SET_COMPONENT(ConfirmAction);
      this.SET_CONFIRM_ACTIONS_PROPS({
        title: 'Вы действительно хотите удалить заметку?',
        typeAction: 'deleteNote'
      })
    },

    validation() {
      if (this.suitableNote.name !== '') {
        return true;
      } else return;
    },

     saveNote() {
      if (!this.validation()) {
        this.error = true;
      } else {

        this.SAVE_NOTE({
          note: this.suitableNote,
          idEdit: this.idEdit
        });

        if (this.canEditNote) this.$router.push('/');
        else this.UPD_STATUS_MODAL();
      }
    },

    cancelEditNote() {
      this.UPD_STATUS_MODAL();
      this.SET_COMPONENT(ConfirmAction);
      this.SET_CONFIRM_ACTIONS_PROPS({
        title: 'Отменить редактирование?',
        typeAction: 'cancelEditNote'
      })
    },

    addTodo() {

      const todo = {
        id: shortid(),
        idNote: this.suitableNote.id,
        name: this.nameTodo,
        checked: false
      }

      this.UPD_PRE_NOTE({
        todos: [...this.suitableNote.todos, todo]
      })

      this.nameTodo = '';
    },

    toogleTodo(id) {

      const todos = this.suitableNote.todos.map(item => {
        if (item.id === id) {
          return { ...item, checked: !item.checked }
        } else return item;
      })

      this.UPD_PRE_NOTE({
        todos
      })
    },

    deleteTodo(id) {

      const todos = this.suitableNote.todos.filter(item => {
        if (item.id !== id) {
          return item;
        } 
      })

      this.UPD_PRE_NOTE({
        todos
      })
    },

    setPreNote() {
      let preNote;
      if (this.canEditNote) {
        preNote = deepCopy(this.notes).find(item => item.id === this.idEdit);
      } else {
        preNote = {
          id: shortid(),
          name: '',
          filter: 'all',
          todos: []
        }
      }
      this.SET_PRE_NOTE(preNote);
    }
  },

}
</script>

<style lang="scss">
  @import './note.scss';
</style>