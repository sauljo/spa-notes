<template>
   <div class="todo" v-bind:class="{'todo_active' : todo.checked}">
    <div
      @click="canEditNote || canAddNote ? toogleTodo(todo.id) : null"
      v-bind:class="[{
        'todo__toogle_can-edit': canEditNote || canAddNote,
      }, 'todo__toogle']">
      <i v-if="todo.checked" class="fas fa-check"></i>
    </div>

    <div class="todo__name">
      <general-input v-model="todo.name" v-if="canEditNote || canAddNote" size='small'/>
      <span v-else>{{todo.name}}</span>
    </div>

    <div v-if="canEditNote || canAddNote" class="todo__actions">
      <div @click="deleteTodo(todo.id)" title="Удалить дело" class="todo__delete">
        <i class="fas fa-trash"></i>
      </div>  
    </div>
  </div>
</template>

<script>

import Input from '@/common/Input/Input.vue';

export default {
  name: 'Todo',
  components: {
  'general-input': Input,
  },
  props: {
    todo: {
      type: Object,
      required: true
    },

    todos: {
      type: Array,
      required: true
    },

    canEditNote: {
      type: Boolean,
      required: false,
      default: false
    },

    canAddNote: {
      type: Boolean,
      required: false,
      default: false
    },

    toogleTodo: {
      type: Function,
      required: true
    },

    deleteTodo: {
      type: Function,
      required: true
    }
  },
}
</script>

<style lang="scss" scoped>
  @import './todo.scss';
</style>