<template>
  <div class="move_todo">
    <div class="move_todo__text">
      <h1>Выберите группу</h1>
    </div>
    <div class="move_todo__groups">
      <div @click="moveTodo(group.id)" v-for="group in groups" v-bind:key="group.id" class="move_todo__group">
        <span>{{group.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '../../Buttons/Buttons.vue';
import { mapMutations, mapState, mapGetters } from 'vuex';

export default {
  name: 'MoveTodo',
  computed: {
    ...mapState({
      idEditGroup: state => state.groups.idEditGroup,
      idEditTodo: state => state.groups.idEditTodo,
    }),
    ...mapGetters(['groups'])
  },
 
  methods: {
    ...mapMutations(['UPD_MODAL', 'UPD_GROUPS']),

    moveTodo(idSelectGroup) {

      if (this.idEditGroup !== idSelectGroup) {

        let groupDeleteTodo = this.groups.find(item => item.id === this.idEditGroup);

        const todo = groupDeleteTodo.todos.find(item => item.id === this.idEditTodo);

        const updGroups = this.groups.map(item => {
          if (item.id === idSelectGroup) {
            return {...item, todos: [...item.todos, todo]}
          } else if (item.id === this.idEditGroup) {
            return {...item, todos: item.todos.filter(todo => todo.id !== this.idEditTodo)}
          } else return item;
        });

        this.UPD_GROUPS([updGroups]);
      }
      this.UPD_MODAL();
    }
  }
}
</script>

<style lang="scss">
  @import './move-todo.scss';
</style>